'use client'

import { Beef, CloudRain, LeafyGreen, Sparkles, TrendingUp, Wheat } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const bars = [18200, 19500, 21200, 28450, 31200, 38500, 35200]

export function DashboardPreview() {
  const { t, lang } = useI18n()
  const max = Math.max(...bars)
  const days = lang === 'th' ? ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const recs = [
    { icon: Beef, name: lang === 'th' ? 'หมูสไลด์' : 'Sliced pork', qty: '+15 kg' },
    { icon: LeafyGreen, name: lang === 'th' ? 'ผักกาดขาว' : 'Napa cabbage', qty: '+5 kg' },
    { icon: Wheat, name: lang === 'th' ? 'เส้นบุก' : 'Konjac noodles', qty: '+8 kg' },
  ]

  return (
    <div className="relative" aria-label={t.landing.previewTitle} role="img">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/70 blur-2xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-warning/70" />
          <span className="size-2.5 rounded-full bg-primary/70" />
          <span className="ml-3 truncate text-xs text-muted-foreground">app.smartstock.ai/dashboard</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {[
            { label: t.dashboard.kpi.salesToday, value: '฿28,450', delta: '+12.5%' },
            { label: t.dashboard.kpi.forecastTomorrow, value: '฿31,200', delta: '+9.7%' },
            { label: t.dashboard.kpi.itemsToOrder, value: lang === 'th' ? '8 รายการ' : '8 items', delta: null },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-border p-3">
              <p className="truncate text-[11px] text-muted-foreground">{k.label}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums">{k.value}</p>
              {k.delta && (
                <p className="flex items-center gap-1 text-[11px] font-medium text-success">
                  <TrendingUp className="size-3" />
                  {k.delta}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="grid gap-3 px-4 pb-4 sm:grid-cols-5">
          <div className="rounded-xl bg-primary p-4 text-primary-foreground sm:col-span-3">
            <p className="flex items-center gap-1.5 text-xs font-medium opacity-90">
              <Sparkles className="size-3.5" />
              {t.dashboard.ai.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed font-medium text-pretty">{t.landing.previewRecommendation}</p>
            <ul className="mt-3 space-y-1.5">
              {recs.map((r) => (
                <li key={r.name} className="flex items-center justify-between rounded-lg bg-primary-foreground/12 px-2.5 py-1.5 text-xs">
                  <span className="flex items-center gap-2">
                    <r.icon className="size-3.5" />
                    {r.name}
                  </span>
                  <span className="font-semibold tabular-nums">{r.qty}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:col-span-2">
            <div className="flex-1 rounded-xl border border-border p-3">
              <p className="text-[11px] text-muted-foreground">{t.salesChart.title}</p>
              <div className="mt-3 flex h-20 items-end gap-1.5">
                {bars.map((b, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className={i >= 4 ? 'w-full rounded-sm bg-primary/35' : 'w-full rounded-sm bg-primary'}
                      style={{ height: `${(b / max) * 64}px` }}
                    />
                    <span className="text-[9px] text-muted-foreground">{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border p-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <CloudRain className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] text-muted-foreground">{t.factors.weather}</p>
                <p className="truncate text-xs font-medium">{t.factors.weatherValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
