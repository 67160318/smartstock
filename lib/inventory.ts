import type { Item } from './mock-data'

export type StockStatus = 'critical' | 'low' | 'normal' | 'healthy'
export type Priority = 'high' | 'medium' | 'low'

export function getStockStatus(item: Pick<Item, 'stock' | 'minStock' | 'predictedDemand'>): StockStatus {
  if (item.stock < item.minStock) return 'critical'
  const coverage = item.predictedDemand > 0 ? item.stock / item.predictedDemand : 2
  if (coverage < 0.6) return 'low'
  if (coverage < 1) return 'normal'
  return 'healthy'
}

export function getCoverage(item: Pick<Item, 'stock' | 'predictedDemand'>) {
  if (item.predictedDemand <= 0) return 100
  return Math.min(100, Math.round((item.stock / item.predictedDemand) * 100))
}

export function getRecommendedQty(item: Pick<Item, 'stock' | 'predictedDemand' | 'active'>) {
  if (!item.active) return 0
  return Math.max(0, Math.ceil(item.predictedDemand - item.stock))
}

export function getPriority(item: Item): Priority {
  const status = getStockStatus(item)
  if (status === 'critical' || status === 'low') return 'high'
  if (status === 'normal') return 'medium'
  return 'low'
}

export function formatTHB(value: number, locale = 'th-TH') {
  return `฿${Math.round(value).toLocaleString(locale)}`
}

export function formatNumber(value: number, locale = 'th-TH') {
  return value.toLocaleString(locale, { maximumFractionDigits: 1 })
}

export function formatDate(iso: string, locale: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(locale, opts)
}
