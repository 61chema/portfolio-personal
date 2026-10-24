import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  // Always land in English: ignore the browser language and the NEXT_LOCALE cookie.
  // Visitors can still switch to Spanish with the ES/EN toggle (/es).
  localeDetection: false,
})
