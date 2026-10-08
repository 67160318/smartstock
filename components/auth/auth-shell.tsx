'use client'

import Image from 'next/image'
import { Logo } from '@/components/shared/logo'
import { LanguageSwitcher } from '@/components/shared/language-switcher'
import { useI18n } from '@/lib/i18n'

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const { t } = useI18n()
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Logo />
          <LanguageSwitcher />
        </div>
        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
      <aside className="relative hidden overflow-hidden bg-primary lg:block">
        <Image
          src="/images/restaurant-owner.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-end gap-6 p-12 text-primary-foreground">
          <h2 className="max-w-md text-3xl font-bold tracking-tight text-balance">{t.auth.sideTitle}</h2>
          <p className="max-w-md opacity-90">{t.auth.sideDesc}</p>
          <figure className="max-w-md rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur-sm">
            <blockquote className="text-sm leading-relaxed">{t.auth.sideQuote}</blockquote>
            <figcaption className="mt-3 text-xs font-medium opacity-80">{t.auth.sideQuoteAuthor}</figcaption>
          </figure>
        </div>
      </aside>
    </div>
  )
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.95l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  )
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-xs text-destructive" role="alert">
      {message}
    </p>
  )
}
