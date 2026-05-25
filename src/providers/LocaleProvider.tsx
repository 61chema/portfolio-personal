'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl'
import en from '../../messages/en.json'
import es from '../../messages/es.json'

type Locale = 'en' | 'es'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allMessages: Record<Locale, AbstractIntlMessages> = { en, es } as any

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
})

export function LocaleProvider({
  children,
  initialLocale,
  initialMessages,
}: {
  children: React.ReactNode
  initialLocale: Locale
  initialMessages: AbstractIntlMessages
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  // Use server-provided messages for initial SSR, switch to client messages after hydration
  const [messages, setMessages] = useState<AbstractIntlMessages>(initialMessages)

  const handleSetLocale = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`
    document.documentElement.lang = newLocale
    // Preserve current hash so the user keeps their scroll anchor across language toggles.
    const hash = window.location.hash
    window.history.replaceState(null, '', `/${newLocale}${hash}`)
    setMessages(allMessages[newLocale])
    setLocale(newLocale)
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}

export const useLocaleSwitch = () => useContext(LocaleContext)
