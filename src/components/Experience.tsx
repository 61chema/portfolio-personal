'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'

export default function Experience() {
  const t = useTranslations('experience')
  const jobs = t.raw('jobs') as Array<{
    company: string
    role: string
    period: string
    location: string
    bullets: string[]
    tags: string[]
  }>

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <SectionHeader number={t('number')} title={t('title')} />
      </AnimatedSection>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-navy-lighter hidden md:block"
          style={{ left: '1rem' }}
        />

        <div className="space-y-12">
          {jobs.map((job, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="group relative md:pl-12">
                {/* Timeline dot */}
                <div
                  className="absolute top-2 w-3 h-3 rounded-full border-2 border-accent bg-navy group-hover:bg-accent transition-colors duration-200 hidden md:block"
                  style={{ left: '0.375rem' }}
                />

                <div className="bg-navy-light border border-navy-lighter rounded-lg p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-text-primary text-lg">
                        {job.role}
                      </h3>
                      <p className="text-accent font-mono text-sm mt-0.5">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-text-secondary whitespace-nowrap bg-navy px-3 py-1 rounded border border-navy-lighter">
                      {job.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} className="text-text-secondary text-sm flex gap-3">
                        <span className="text-accent mt-1 flex-shrink-0">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-accent/70 bg-accent/10 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
