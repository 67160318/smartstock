import Link from 'next/link'
import { Sprout } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm',
        className,
      )}
      aria-hidden="true"
    >
      <Sprout className="size-5" />
    </span>
  )
}

export function Logo({
  href = '/',
  showText = true,
  className,
  textClassName,
}: {
  href?: string
  showText?: boolean
  className?: string
  textClassName?: string
}) {
  return (
    <Link href={href} className={cn('flex items-center gap-2.5', className)} aria-label="SmartStock AI">
      <LogoMark />
      {showText && (
        <span className={cn('text-lg font-semibold tracking-tight text-foreground', textClassName)}>
          SmartStock <span className="text-primary">AI</span>
        </span>
      )}
    </Link>
  )
}
