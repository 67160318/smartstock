'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { LanguageSwitcher } from '@/components/shared/language-switcher'
import { Logo } from '@/components/shared/logo'
import { useAppStore } from '@/lib/app-store'
import { useI18n } from '@/lib/i18n'
import { GlobalSearch } from './global-search'
import { NotificationsMenu } from './notifications-menu'
import { DesktopSidebar, SidebarNav } from './sidebar'
import { UserMenu } from './user-menu'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useI18n()
  const { hydrated, user } = useAppStore()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (hydrated && !user) router.replace('/login')
  }, [hydrated, user, router])

  if (!hydrated || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center" role="status">
        <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
        <span className="sr-only">{t.common.loading}</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh bg-background">
      <DesktopSidebar />
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 gap-0 bg-sidebar p-0">
          <div className="flex h-16 items-center border-b border-sidebar-border px-4">
            <Logo href="/dashboard" />
          </div>
          <SheetTitle className="sr-only">{t.nav.mainMenu}</SheetTitle>
          <SheetDescription className="sr-only">SmartStock AI</SheetDescription>
          <div className="flex-1 overflow-y-auto p-3">
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur-md sm:gap-3 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            aria-label={t.nav.openMenu}
          >
            <Menu className="size-5" />
          </button>
          <GlobalSearch className="max-w-md flex-1" />
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <NotificationsMenu />
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
