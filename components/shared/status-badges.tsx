'use client'

import { Beef, Droplet, Egg, LeafyGreen, Soup, Sprout, Wheat, type LucideIcon } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import type { Priority, StockStatus } from '@/lib/inventory'
import type { Category, POStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const tone = {
  danger: 'bg-destructive/10 text-destructive',
  warning: 'bg-warning/15 text-warning-strong',
  neutral: 'bg-secondary text-secondary-foreground ring-1 ring-border',
  success: 'bg-success/10 text-success',
  info: 'bg-accent text-accent-foreground',
}

function Pill({ className, children, dot }: { className: string; children: React.ReactNode; dot?: boolean }) {
  return (
    <span className={cn('inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap', className)}>
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}

const stockTone: Record<StockStatus, string> = {
  critical: tone.danger,
  low: tone.warning,
  normal: tone.neutral,
  healthy: tone.success,
}

export function StockStatusBadge({ status }: { status: StockStatus }) {
  const { t } = useI18n()
  return (
    <Pill className={stockTone[status]} dot>
      {t.stockStatus[status]}
    </Pill>
  )
}

const priorityTone: Record<Priority, string> = { high: tone.danger, medium: tone.warning, low: tone.neutral }

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { t } = useI18n()
  return <Pill className={priorityTone[priority]}>{t.priority[priority]}</Pill>
}

const poTone: Record<POStatus, string> = { draft: tone.neutral, ordered: tone.info, received: tone.success }

export function POStatusBadge({ status }: { status: POStatus }) {
  const { t } = useI18n()
  return (
    <Pill className={poTone[status]} dot>
      {t.poStatus[status]}
    </Pill>
  )
}

export function ActiveBadge({ active }: { active: boolean }) {
  const { t } = useI18n()
  return (
    <Pill className={active ? tone.success : tone.neutral} dot>
      {active ? t.activeStatus.active : t.activeStatus.inactive}
    </Pill>
  )
}

export function ConfidenceBadge({ value }: { value: number }) {
  return <Pill className={value >= 85 ? tone.success : value >= 70 ? tone.warning : tone.danger}>{value}%</Pill>
}

const categoryIcons: Record<Category, LucideIcon> = {
  meat: Beef,
  vegetable: LeafyGreen,
  mushroom: Sprout,
  noodle: Wheat,
  soup: Soup,
  sauce: Droplet,
  other: Egg,
}

const categoryTone: Record<Category, string> = {
  meat: 'bg-destructive/10 text-destructive',
  vegetable: 'bg-success/10 text-success',
  mushroom: 'bg-warning/15 text-warning-strong',
  noodle: 'bg-warning/15 text-warning-strong',
  soup: 'bg-accent text-accent-foreground',
  sauce: 'bg-destructive/10 text-destructive',
  other: 'bg-secondary text-secondary-foreground',
}

export function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  const Icon = categoryIcons[category]
  return (
    <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', categoryTone[category], className)} aria-hidden="true">
      <Icon className="size-4" />
    </span>
  )
}
