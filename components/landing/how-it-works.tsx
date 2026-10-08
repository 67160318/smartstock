'use client'

import { BarChart3, BrainCircuit, CloudSun, ShoppingCart, Upload } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { SectionHeading } from './features'

const icons = [Upload, BrainCircuit, CloudSun, BarChart3, ShoppingCart]

export function HowItWorks() {
  const { t } = useI18n()
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-secondary/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow={t.landing.howEyebrow} title={t.landing.howTitle} subtitle={t.landing.howSubtitle} />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-5 md:gap-4">
          <div className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-border md:block" aria-hidden="true" />
          {t.landing.steps.map((s, i) => {
            const Icon = icons[i]
            return (
              <li key={s.title} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-secondary bg-primary text-primary-foreground shadow-sm">
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-semibold md:mt-2">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
