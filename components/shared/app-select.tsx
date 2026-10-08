'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export type SelectOption = { value: string; label: string }

export function AppSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
  id,
  ariaLabel,
  size = 'default',
}: {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  id?: string
  ariaLabel?: string
  size?: 'sm' | 'default'
}) {
  return (
    <Select
      items={options}
      value={value || null}
      onValueChange={(next) => {
        if (typeof next === 'string') onChange(next)
      }}
    >
      <SelectTrigger id={id} size={size} aria-label={ariaLabel} className={cn('w-full bg-background', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
