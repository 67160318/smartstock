'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, PlayCircle, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { DashboardPreview } from './dashboard-preview'

export function Hero() {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-accent),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-16 md:px-6 md:pt-20 md:pb-24 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {t.landing.badge}
          </span>
          <h1 className="mt-6 text-4xl leading-[1.15] font-bold tracking-tight text-balance md:text-5xl lg:text-[3.4rem]">
            {t.landing.heroTitle1}
            <span className="mt-1 block text-primary">{t.landing.heroTitle2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            {t.landing.heroSubtitle}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/register" className={cn(buttonVariants({ size: 'lg' }), 'h-12 px-6 text-base')}>
              {t.landing.ctaPrimary}
              <ArrowRight data-icon="inline-end" />
            </Link>
            <a href="#how-it-works" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-12 px-6 text-base')}>
              <PlayCircle data-icon="inline-start" />
              {t.landing.ctaSecondary}
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {t.landing.trust}
          </p>
        </div>
        <DashboardPreview />
      </div>
      <div className="border-y border-border bg-card">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 md:grid-cols-4 md:px-6">
          {t.landing.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 py-6 md:py-8">
              <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="order-1 text-3xl font-bold tracking-tight text-primary tabular-nums md:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
