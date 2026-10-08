'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function FinalCta() {
  const { t } = useI18n()
  return (
    <section className="px-4 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-12 md:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-4xl">{t.landing.ctaTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base opacity-90 md:text-lg">{t.landing.ctaSubtitle}</p>
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'lg' }),
            'mt-8 h-12 bg-background px-6 text-base text-primary hover:bg-background/90',
          )}
        >
          {t.landing.ctaPrimary}
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>
    </section>
  )
}

export function LandingFooter() {
  const { t } = useI18n()
  const cols = [
    {
      title: t.landing.footerProduct,
      links: [
        { label: t.nav.features, href: '#features' },
        { label: t.nav.howItWorks, href: '#how-it-works' },
        { label: t.nav.pricing, href: '#pricing' },
      ],
    },
    {
      title: t.landing.footerCompany,
      links: [
        { label: t.landing.footerLinks.about, href: '#' },
        { label: t.landing.footerLinks.contact, href: '#' },
        { label: t.landing.footerLinks.privacy, href: '#' },
        { label: t.landing.footerLinks.terms, href: '#' },
      ],
    },
    {
      title: t.landing.footerIntegrations,
      links: [
        { label: 'Wongnai POS', href: '#' },
        { label: 'FoodStory', href: '#' },
        { label: 'Ocha', href: '#' },
        { label: 'CSV', href: '#' },
      ],
    },
  ]
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-5 md:px-6">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.landing.footerDesc}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm font-semibold">{c.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground md:px-6">
          © 2026 SmartStock AI. {t.landing.rights}.
        </p>
      </div>
    </footer>
  )
}
