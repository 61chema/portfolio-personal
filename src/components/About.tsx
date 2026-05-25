'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'
import { GitHubIcon, LinkedInIcon } from './icons/SocialIcons'
import { SOCIAL } from '@/lib/social'

const techStack = [
  { category: 'Frontend', items: ['React', 'JavaScript', 'HTML5', 'CSS3'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'WebSockets', 'REST APIs'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL'] },
  { category: 'Cloud / DevOps', items: ['Azure', 'Docker', 'Git'] },
]

export default function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <SectionHeader number={t('number')} title={t('title')} />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <AnimatedSection delay={0.1}>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>{t('bio1')}</p>
            <p>{t('bio2')}</p>
            <p className="font-mono text-accent text-sm mt-6 border-l-2 border-accent pl-4">
              &ldquo;{t('motto')}&rdquo;
            </p>

            {/* Social links */}
            <div className="flex gap-4 mt-8">
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
              >
                <GitHubIcon size={18} />
                GitHub
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
              >
                <LinkedInIcon size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="space-y-6">
            {techStack.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-text-secondary bg-navy-light border border-navy-lighter px-3 py-1.5 rounded hover:border-accent hover:text-accent transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
