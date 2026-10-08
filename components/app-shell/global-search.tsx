'use client'

import { useRouter } from 'next/navigation'
import { useId, useMemo, useRef, useState } from 'react'
import { Search, Truck } from 'lucide-react'
import { CategoryIcon } from '@/components/shared/status-badges'
import { useAppStore } from '@/lib/app-store'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Result = { id: string; label: string; meta: string; href: string; kind: 'item' | 'supplier'; category?: string }

export function GlobalSearch({ className }: { className?: string }) {
  const { t, l } = useI18n()
  const { items, suppliers } = useAppStore()
  const router = useRouter()
  const listId = useId()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const blurTimer = useRef<number | undefined>(undefined)

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const itemResults: Result[] = items
      .filter((i) => i.name.th.toLowerCase().includes(q) || i.name.en.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q))
      .slice(0, 5)
      .map((i) => ({ id: i.id, label: l(i.name), meta: i.sku, href: `/inventory?q=${encodeURIComponent(i.sku)}`, kind: 'item', category: i.category }))
    const supplierResults: Result[] = suppliers
      .filter((s) => s.name.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q))
      .slice(0, 3)
      .map((s) => ({ id: s.id, label: s.name, meta: s.contact, href: `/suppliers?q=${encodeURIComponent(s.name)}`, kind: 'supplier' }))
    return [...itemResults, ...supplierResults]
  }, [query, items, suppliers, l])

  function go(result: Result) {
    router.push(result.href)
    setOpen(false)
    setQuery('')
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(results.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault()
      go(results[activeIndex])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showPanel = open && query.trim().length > 0
  const itemCount = results.filter((r) => r.kind === 'item').length

  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-label={t.common.search}
        placeholder={t.header.searchPlaceholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActiveIndex(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          blurTimer.current = window.setTimeout(() => setOpen(false), 120)
        }}
        onKeyDown={onKeyDown}
        className="h-10 w-full rounded-lg border border-input bg-muted/50 pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:bg-background focus:ring-3 focus:ring-ring/30"
      />
      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className="absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-lg"
          onMouseDown={() => window.clearTimeout(blurTimer.current)}
        >
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">{t.header.noResults}</p>
          ) : (
            results.map((r, index) => (
              <div key={`${r.kind}-${r.id}`}>
                {(index === 0 || index === itemCount) && (
                  <p className="px-2.5 pt-2 pb-1 text-xs font-medium text-muted-foreground">
                    {r.kind === 'item' ? t.header.ingredients : t.header.suppliers}
                  </p>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => go(r)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm',
                    index === activeIndex && 'bg-accent text-accent-foreground',
                  )}
                >
                  {r.kind === 'item' && r.category ? (
                    <CategoryIcon category={r.category as never} className="size-8" />
                  ) : (
                    <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Truck className="size-4" aria-hidden="true" />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.meta}</span>
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
