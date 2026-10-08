'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { SectionHeading } from './features'

export function Pricing() {
  const { t } = useI18n()
  return (
    <section id="pricing" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow={t.landing.pricingEyebrow} title={t.landing.pricingTitle} subtitle={t.landing.pricingSubtitle} />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.landing.plans.map((plan, i) => {
            const featured = i === 2
            return (
              <div
                key={plan.name}
                className={cn(
                  'relative flex flex-col rounded-2xl border bg-card p-6',
                  featured ? 'border-primary shadow-xl shadow-primary/10 ring-1 ring-primary' : 'border-border',
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                    {t.landing.popular}
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 min-h-10 text-sm text-muted-foreground">{plan.desc}</p>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={cn(buttonVariants({ variant: featured ? 'default' : 'outline', size: 'lg' }), 'mt-8 h-11 w-full')}
                >
                  {plan.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
