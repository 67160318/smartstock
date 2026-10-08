'use client'

import Image from 'next/image'
import { BrainCircuit, CloudSun, FileSpreadsheet, ListChecks, PackageSearch, ShoppingCart } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const icons = [BrainCircuit, PackageSearch, CloudSun, ListChecks, FileSpreadsheet, ShoppingCart]

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground text-pretty md:text-lg">{subtitle}</p>
    </div>
  )
}

export function Features() {
  const { t } = useI18n()
  return (
    <section id="features" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow={t.landing.featuresEyebrow} title={t.landing.featuresTitle} subtitle={t.landing.featuresSubtitle} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.landing.features.map((f, i) => {
            const Icon = icons[i]
            return (
              <article
                key={f.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-16 grid items-center overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-80">
            <Image
              src="/images/restaurant-owner.png"
              alt="Restaurant owner checking ingredient recommendations on a tablet"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-8 md:p-12">
            <p className="text-sm font-semibold text-primary">{t.landing.builtFor}</p>
            <blockquote className="mt-4 text-xl leading-relaxed font-medium text-balance md:text-2xl">{t.auth.sideQuote}</blockquote>
            <p className="mt-4 text-sm text-muted-foreground">{t.auth.sideQuoteAuthor}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
