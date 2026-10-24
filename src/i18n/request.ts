import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as 'en' | 'es')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    // Explicit default so dates/times render consistently on server and client.
    timeZone: 'Europe/Madrid',
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
