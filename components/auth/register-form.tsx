'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AppSelect } from '@/components/shared/app-select'
import { useAppStore } from '@/lib/app-store'
import { useI18n } from '@/lib/i18n'
import { RESTAURANT_TYPES, type RestaurantType } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { AuthShell, FieldError, GoogleIcon } from './auth-shell'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Fields = { name: string; restaurant: string; type: string; email: string; password: string; confirm: string }
type Errors = Partial<Record<keyof Fields, string>>

function passwordScore(pw: string) {
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return Math.min(4, score)
}

const strengthColors = ['bg-destructive', 'bg-destructive', 'bg-warning', 'bg-primary/70', 'bg-primary']

export function RegisterForm() {
  const { t } = useI18n()
  const { login } = useAppStore()
  const router = useRouter()
  const [f, setF] = useState<Fields>({ name: '', restaurant: '', type: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const score = passwordScore(f.password)

  const set = (key: keyof Fields) => (value: string) => setF((prev) => ({ ...prev, [key]: value }))

  function validate() {
    const next: Errors = {}
    if (!f.name.trim()) next.name = t.auth.errors.required
    if (!f.restaurant.trim()) next.restaurant = t.auth.errors.required
    if (!f.type) next.type = t.auth.errors.required
    if (!EMAIL_RE.test(f.email)) next.email = t.auth.errors.email
    if (f.password.length < 6) next.password = t.auth.errors.password
    if (f.confirm !== f.password || !f.confirm) next.confirm = t.auth.errors.passwordMatch
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    window.setTimeout(() => {
      login({ name: f.name.trim(), email: f.email, restaurant: f.restaurant.trim(), restaurantType: f.type as RestaurantType })
      toast.success(t.auth.registerSuccess)
      router.push('/dashboard')
    }, 700)
  }

  const field = (key: keyof Fields, label: string, type = 'text', autoComplete?: string) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        type={type}
        autoComplete={autoComplete}
        value={f[key]}
        onChange={(e) => set(key)(e.target.value)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        className="h-11"
      />
      <FieldError id={`${key}-error`} message={errors[key]} />
    </div>
  )

  return (
    <AuthShell title={t.auth.createAccount} subtitle={t.auth.registerSubtitle}>
      <Button variant="outline" size="lg" className="h-11 w-full" onClick={() => toast.info(t.auth.googleSoon)}>
        <GoogleIcon />
        {t.auth.continueGoogle}
      </Button>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {t.auth.or}
        <span className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        {field('name', t.auth.fullName, 'text', 'name')}
        <div className="grid gap-4 sm:grid-cols-2">
          {field('restaurant', t.auth.restaurantName, 'text', 'organization')}
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">{t.auth.restaurantType}</Label>
            <AppSelect
              id="type"
              value={f.type}
              onChange={set('type')}
              placeholder={t.auth.selectType}
              className={cn('h-11', errors.type && 'border-destructive')}
              options={RESTAURANT_TYPES.map((r) => ({ value: r, label: t.restaurantTypes[r] }))}
            />
            <FieldError id="type-error" message={errors.type} />
          </div>
        </div>
        {field('email', t.auth.email, 'email', 'email')}
        <div className="flex flex-col gap-2">
          {field('password', t.auth.password, 'password', 'new-password')}
          {f.password && (
            <div className="flex flex-col gap-1.5" aria-live="polite">
              <div className="flex gap-1" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < score ? strengthColors[score] : 'bg-muted')} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {t.auth.strength}: <span className="font-medium text-foreground">{t.auth.strengthLevels[score]}</span>
              </p>
            </div>
          )}
        </div>
        {field('confirm', t.auth.confirmPassword, 'password', 'new-password')}
        <Button type="submit" size="lg" className="mt-2 h-11 text-base" disabled={submitting}>
          {submitting && <Loader2 className="animate-spin" data-icon="inline-start" />}
          {t.auth.registerButton}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t.auth.haveAccount}{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          {t.auth.signIn}
        </Link>
      </p>
    </AuthShell>
  )
}
