import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import CursorSpotlight from '@/components/CursorSpotlight'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

// Display font for the big name in the hero
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: ['ai software engineer', 'ai agents', 'react', 'fastapi', 'azure', 'barcelona', 'portfolio'],
    authors: [{ name: 'José María Rodríguez García' }],
    alternates: { canonical: '/' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-body text-text-primary antialiased`}>
        {/* Inherits locale, messages and time zone from src/i18n/request.ts */}
        <NextIntlClientProvider>
          <CursorSpotlight />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
