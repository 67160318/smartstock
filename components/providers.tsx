'use client'

import { LanguageProvider } from '@/lib/i18n'
import { AppStoreProvider } from '@/lib/app-store'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppStoreProvider>
        {children}
        <Toaster theme="light" position="top-right" richColors />
      </AppStoreProvider>
    </LanguageProvider>
  )
}
