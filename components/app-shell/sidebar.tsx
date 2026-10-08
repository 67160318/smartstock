'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BrainCircuit,
  Boxes,
  ChevronsLeft,
  ChevronsRight,
  FileUp,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { useAppStore } from '@/lib/app-store'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type NavKey = 'dashboard' | 'inventory' | 'products' | 'import' | 'purchaseOrders' | 'suppliers' | 'forecast' | 'settings'

export const NAV_ITEMS: { key: NavKey; href: string; icon: LucideIcon }[] = [
  { key: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'inventory', href: '/inventory', icon: Boxes },
  { key: 'products', href: '/products', icon: Package },
  { key: 'import', href: '/import', icon: FileUp },
  { key: 'purchaseOrders', href: '/purchase-orders', icon: ShoppingCart },
  { key: 'suppliers', href: '/suppliers', icon: Truck },
  { key: 'forecast', href: '/forecast', icon: BrainCircuit },
  { key: 'settings', href: '/settings', icon: Settings },
]

export function SidebarNav({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const { t } = useI18n()
  const pathname = usePathname()
  const { items } = useAppStore()
  const urgent = items.filter((i) => i.active && i.stock < i.minStock).length

  return (
    <nav aria-label={t.nav.mainMenu} className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ key, href, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`)
        const label = t.nav[key]
        return (
          <Link
            key={key}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            title={collapsed ? label : undefined}
            className={cn(
              'group relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-xs'
                : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              collapsed && 'justify-center px-0',
            )}
          >
            <Icon className="size-[18px] shrink-0" aria-hidden="true" />
            {!collapsed && <span className="truncate">{label}</span>}
            {key === 'inventory' && urgent > 0 && (
              <span
                className={cn(
                  'flex min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-semibold text-white',
                  collapsed ? 'absolute top-1 right-1 h-4 min-w-4 px-1 text-[10px]' : 'ml-auto h-5',
                )}
              >
                {urgent}
                <span className="sr-only"> urgent</span>
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export function DesktopSidebar() {
  const { t } = useI18n()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:flex',
        sidebarCollapsed ? 'w-[72px]' : 'w-64',
      )}
    >
      <div className={cn('flex h-16 items-center border-b border-sidebar-border px-4', sidebarCollapsed && 'justify-center px-0')}>
        <Logo href="/dashboard" showText={!sidebarCollapsed} />
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <SidebarNav collapsed={sidebarCollapsed} />
      </div>
      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            'flex h-9 w-full items-center gap-2 rounded-lg px-3 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            sidebarCollapsed && 'justify-center px-0',
          )}
          aria-label={sidebarCollapsed ? t.nav.expand : t.nav.collapse}
        >
          {sidebarCollapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
          {!sidebarCollapsed && <span>{t.nav.collapse}</span>}
        </button>
      </div>
    </aside>
  )
}
