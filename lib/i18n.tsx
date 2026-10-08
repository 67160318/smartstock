'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { th, type Dictionary } from './translations/th'
import { en } from './translations/en'

export type Lang = 'th' | 'en'
export type Localized = { th: string; en: string }

const dictionaries: Record<Lang, Dictionary> = { th, en }
const STORAGE_KEY = 'smartstock-lang'

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dictionary
  l: (value: Localized) => string
  locale: string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('th')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'th' || stored === 'en') setLangState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
      l: (v: Localized) => v[lang] || v.th,
      locale: lang === 'th' ? 'th-TH' : 'en-US',
    }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
