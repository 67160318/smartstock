'use client'

import { useI18n, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const options: { value: Lang; label: string; full: string }[] = [
  { value: 'th', label: 'TH', full: 'ไทย' },
  { value: 'en', label: 'EN', full: 'English' },
]

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn('inline-flex h-8 items-center rounded-lg border border-border bg-muted p-0.5 text-xs font-semibold', className)}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          title={opt.full}
          className={cn(
            'h-full rounded-md px-2.5 transition-colors',
            lang === opt.value ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
