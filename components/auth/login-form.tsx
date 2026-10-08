'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff, Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppStore } from '@/lib/app-store'
import { useI18n } from '@/lib/i18n'
import { AuthShell, FieldError, GoogleIcon } from './auth-shell'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm() {
  const { t } = useI18n()
  const { login } = useAppStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const next: typeof errors = {}
    if (!EMAIL_RE.test(email)) next.email = t.auth.errors.email
    if (password.length < 6) next.password = t.auth.errors.password
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    window.setTimeout(() => {
      login({ name: 'คุณปิยะ', email, restaurant: 'ABC Shabu', restaurantType: 'shabu' })
      toast.success(t.auth.loginSuccess)
      router.push('/dashboard')
    }, 600)
  }

  function fillDemo() {
    setEmail('owner@abcshabu.co.th')
    setPassword('demo1234')
    setErrors({})
  }

  return (
    <AuthShell title={t.auth.welcomeBack} subtitle={t.auth.loginSubtitle}>
      <button
        type="button"
        onClick={fillDemo}
        className="mb-6 flex w-full items-start gap-3 rounded-xl border border-primary/25 bg-accent/60 p-3 text-left text-sm transition-colors hover:bg-accent"
      >
        <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          <span className="block font-medium text-accent-foreground">{t.auth.useDemo}</span>
          <span className="text-xs text-muted-foreground">{t.auth.demoHint}</span>
        </span>
      </button>

      <form onSubmit={submit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t.auth.email}</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@restaurant.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="h-11"
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t.auth.password}</Label>
            <button type="button" className="text-xs font-medium text-primary hover:underline" onClick={() => toast.info(t.auth.forgotSoon)}>
              {t.auth.forgotPassword}
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="h-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <FieldError id="password-error" message={errors.password} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
          {t.auth.rememberMe}
        </label>
        <Button type="submit" size="lg" className="h-11 text-base" disabled={submitting}>
          {submitting && <Loader2 className="animate-spin" data-icon="inline-start" />}
          {t.auth.loginButton}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {t.auth.or}
        <span className="h-px flex-1 bg-border" />
      </div>
      <Button variant="outline" size="lg" className="h-11 w-full" onClick={() => toast.info(t.auth.googleSoon)}>
        <GoogleIcon />
        {t.auth.continueGoogle}
      </Button>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t.auth.noAccount}{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          {t.auth.signUp}
        </Link>
      </p>
    </AuthShell>
  )
}
