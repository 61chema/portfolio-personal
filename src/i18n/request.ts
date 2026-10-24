import { getRequestConfig } from 'next-intl/server'

// English only: no locale routing, so the locale is fixed here
export default getRequestConfig(async () => ({
  locale: 'en',
  // Explicit default so dates/times render consistently on server and client.
  timeZone: 'Europe/Madrid',
  messages: (await import('../../messages/en.json')).default,
}))
