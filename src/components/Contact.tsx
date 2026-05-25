'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'
import { Mail, FileDown } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons/SocialIcons'
import { SOCIAL, CV_FILE } from '@/lib/social'

export default function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <SectionHeader number={t('number')} title={t('title')} />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="max-w-lg">
          <p className="text-text-secondary text-lg leading-relaxed mb-10">
            {t('message')}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href={`mailto:${SOCIAL.email}`}
              className="inline-flex items-center gap-2.5 border border-accent text-accent px-6 py-3 rounded font-mono text-sm hover:bg-accent/10 transition-all duration-200"
            >
              <Mail size={16} />
              {t('email_cta')}
            </a>
            <a
              href={CV_FILE.href}
              download={CV_FILE.downloadName}
              className="inline-flex items-center gap-2.5 border border-navy-lighter text-text-secondary px-6 py-3 rounded font-mono text-sm hover:border-accent hover:text-accent transition-all duration-200"
            >
              <FileDown size={16} />
              {t('download_cv')}
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent hover:-translate-y-1 transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon size={22} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent hover:-translate-y-1 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={22} />
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
