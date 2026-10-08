'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { LanguageSwitcher } from '@/components/shared/language-switcher'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LandingHeader() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#features', label: t.nav.features },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#pricing', label: t.nav.pricing },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label={t.nav.mainMenu} className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'hidden sm:inline-flex')}>
            {t.nav.login}
          </Link>
          <Link href="/register" className={cn(buttonVariants({ size: 'lg' }), 'hidden sm:inline-flex')}>
            {t.nav.register}
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)} aria-label={t.nav.openMenu}>
            <Menu />
          </Button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4" aria-label={t.nav.mainMenu}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2 p-4">
            <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              {t.nav.login}
            </Link>
            <Link href="/register" className={buttonVariants({ size: 'lg' })}>
              {t.nav.register}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
