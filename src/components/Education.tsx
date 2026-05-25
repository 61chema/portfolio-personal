'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'
import { GraduationCap, Languages } from 'lucide-react'

export default function Education() {
  const t = useTranslations('education')
  const tLang = useTranslations('languages')
  const items = t.raw('items') as Array<{
    institution: string
    degree: string
    period: string
  }>
  const langItems = tLang.raw('items') as Array<{
    language: string
    level: string
  }>

  return (
    <section id="education" className="py-24 px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <SectionHeader number={t('number')} title={t('title')} />
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {items.map((item, index) => (
          <AnimatedSection key={index} delay={index * 0.1}>
            <div className="group bg-navy-light border border-navy-lighter rounded-lg p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <GraduationCap size={28} className="text-accent mb-4" />
              <h3 className="font-heading font-bold text-text-primary mb-1">
                {item.institution}
              </h3>
              <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                {item.degree}
              </p>
              <span className="font-mono text-xs text-accent/70 bg-accent/10 px-2 py-0.5 rounded">
                {item.period}
              </span>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Languages */}
      <AnimatedSection delay={0.3}>
        <div className="flex items-center gap-3 mb-6">
          <Languages size={18} className="text-accent" />
          <h3 className="font-heading font-bold text-text-primary text-lg">
            {tLang('title')}
          </h3>
        </div>
        <div className="flex flex-wrap gap-4">
          {langItems.map((item) => (
            <div
              key={item.language}
              className="flex items-center gap-3 bg-navy-light border border-navy-lighter rounded-lg px-5 py-3"
            >
              <span className="font-heading font-semibold text-text-primary text-sm">
                {item.language}
              </span>
              <span className="w-px h-4 bg-navy-lighter" />
              <span className="font-mono text-xs text-text-secondary">
                {item.level}
              </span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
