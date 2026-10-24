'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'
import { FileDown } from 'lucide-react'
import { SOCIAL, CV_FILE } from '@/lib/social'

// Short, readable versions of the profile URLs, shown as plain text
const LINKEDIN_HANDLE = SOCIAL.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com/, '')
const GITHUB_HANDLE = '@' + SOCIAL.github.split('/').pop()

export default function Contact() {
  const t = useTranslations('contact')
  const [copied, setCopied] = useState(false)

  // mailto: links do nothing for people without a mail app, so the email is also copyable
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SOCIAL.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the email stays visible to copy by hand
    }
  }

  const details = [
    { label: t('location_label'), value: t('location') },
    { label: 'LinkedIn', value: LINKEDIN_HANDLE, href: SOCIAL.linkedin },
    { label: 'GitHub', value: GITHUB_HANDLE, href: SOCIAL.github },
  ]

  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <AnimatedSection>
        <SectionHeader number={t('number')} title={t('title')} />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="text-text-body text-lg md:text-xl leading-relaxed max-w-2xl">{t('message')}</p>

        {/* The email is the main action: big, clickable and copyable */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${SOCIAL.email}`}
            className="font-mono text-xl sm:text-2xl md:text-[2rem] text-accent border-b border-accent/40 pb-1 hover:border-accent transition-colors duration-200 break-all"
          >
            {SOCIAL.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="h-9 rounded-full border border-line px-4 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary hover:border-text-secondary/50 transition-colors duration-200"
          >
            <span aria-live="polite">{copied ? t('copied') : t('copy')}</span>
          </button>
        </div>

        {/* Details row: plain text instead of icons, CV as the only button */}
        <div className="mt-16 border-t border-line pt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-8 items-center">
          {details.map((item) => (
            <div key={item.label}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-[15px] text-text-primary hover:text-accent transition-colors duration-200"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 font-mono text-[15px] text-text-primary">{item.value}</p>
              )}
            </div>
          ))}
          <a
            href={CV_FILE.href}
            download={CV_FILE.downloadName}
            className="justify-self-start lg:justify-self-end inline-flex h-11 items-center gap-2.5 rounded-full border border-line px-6 font-mono text-xs uppercase tracking-[0.18em] text-text-primary hover:border-text-secondary/60 transition-colors duration-200"
          >
            <FileDown size={16} aria-hidden="true" />
            {t('download_cv')}
          </a>
        </div>
      </AnimatedSection>
    </section>
  )
}
