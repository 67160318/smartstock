'use client'

import { useRouter } from 'next/navigation'
import { Bell, BrainCircuit, PackageCheck, TrendingUp, TriangleAlert } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppStore } from '@/lib/app-store'
import { useI18n } from '@/lib/i18n'
import type { AppNotification } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const typeStyles: Record<AppNotification['type'], { icon: typeof Bell; className: string }> = {
  ai: { icon: BrainCircuit, className: 'bg-primary/10 text-primary' },
  stock: { icon: TriangleAlert, className: 'bg-destructive/10 text-destructive' },
  forecast: { icon: TrendingUp, className: 'bg-chart-2/15 text-chart-2' },
  order: { icon: PackageCheck, className: 'bg-muted text-muted-foreground' },
}

export function NotificationsMenu() {
  const { t, l } = useI18n()
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore()
  const router = useRouter()
  const unread = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={`${t.header.notifications}${unread ? ` (${t.header.unread(unread)})` : ''}`}
      >
        <Bell className="size-5" aria-hidden="true" />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white">
            {unread}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[min(22rem,calc(100vw-2rem))] p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold">{t.header.notifications}</p>
            {unread > 0 && <p className="text-xs text-muted-foreground">{t.header.unread(unread)}</p>}
          </div>
          {unread > 0 && (
            <button type="button" onClick={markAllNotificationsRead} className="text-xs font-medium text-primary hover:underline">
              {t.header.markAllRead}
            </button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto p-1.5">
          {notifications.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">{t.header.noNotifications}</p>
          ) : (
            notifications.map((n) => {
              const { icon: Icon, className } = typeStyles[n.type]
              return (
                <DropdownMenuItem
                  key={n.id}
                  onClick={() => {
                    markNotificationRead(n.id)
                    router.push(n.href)
                  }}
                  className="items-start gap-3 rounded-lg p-2.5"
                >
                  <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', className)}>
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className={cn('truncate text-sm', !n.read ? 'font-semibold' : 'font-medium')}>{l(n.title)}</span>
                      {!n.read && <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="unread" />}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{l(n.body)}</span>
                    <span className="mt-1 block text-[11px] text-muted-foreground/80">{l(n.time)}</span>
                  </span>
                </DropdownMenuItem>
              )
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
