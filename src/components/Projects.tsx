'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'
import { ExternalLink, Folder } from 'lucide-react'
import { GitHubIcon } from './icons/SocialIcons'

type ProjectStatus = 'in_progress' | 'live' | 'placeholder'

interface FeaturedProject {
  name: string
  description: string
  tags: string[]
  github: string
  live?: string
  status: ProjectStatus
}

interface OtherProject {
  name: string
  description?: string
  tags?: string[]
  github: string
  live?: string
}

export default function Projects() {
  const t = useTranslations('projects')
  const featured = t.raw('featured') as FeaturedProject[]
  const other = t.raw('other') as OtherProject[]

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <SectionHeader number={t('number')} title={t('title')} />
      </AnimatedSection>

      {/* Featured projects */}
      <div className="space-y-8 mb-20">
        <AnimatedSection>
          <h3 className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-8">
            {t('featured_label')}
          </h3>
        </AnimatedSection>

        {featured.map((project, index) => {
          const isPlaceholder = project.status === 'placeholder'
          return (
            <AnimatedSection key={`${project.name}-${index}`} delay={index * 0.1}>
              <div
                className={`group relative bg-navy-light border rounded-lg p-8 transition-all duration-300 ${
                  isPlaceholder
                    ? 'border-dashed border-navy-lighter/60 opacity-70'
                    : 'border-navy-lighter hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5'
                }`}
              >
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div>
                    {project.status === 'in_progress' && (
                      <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 rounded mb-3 inline-block">
                        {t('in_progress')}
                      </span>
                    )}
                    {project.status === 'placeholder' && (
                      <span className="font-mono text-xs text-text-secondary bg-navy border border-navy-lighter px-2 py-0.5 rounded mb-3 inline-block">
                        {t('coming_soon')}
                      </span>
                    )}
                    <h3 className="font-heading font-bold text-text-primary text-xl mt-2">
                      {project.name}
                    </h3>
                  </div>
                  {!isPlaceholder && (
                    <div className="flex items-center gap-3 text-text-secondary shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors duration-200 cursor-pointer"
                          aria-label={`${project.name} GitHub`}
                        >
                          <GitHubIcon size={20} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors duration-200 cursor-pointer"
                          aria-label={`${project.name} live demo`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-text-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-accent/70 bg-accent/10 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )
        })}
      </div>

      {/* Other projects — only render the block if there is at least one entry */}
      {other.length > 0 && (
        <>
          <AnimatedSection>
            <h3 className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-8">
              {t('other_label')}
            </h3>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {other.map((project, index) => (
              <AnimatedSection key={`${project.name}-${index}`} delay={index * 0.05}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-navy-light border border-navy-lighter rounded-lg p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Folder size={28} className="text-accent" />
                    <div className="flex items-center gap-2 text-text-secondary">
                      <GitHubIcon
                        size={18}
                        className="group-hover:text-accent transition-colors"
                      />
                      {project.live && (
                        <ExternalLink
                          size={18}
                          className="group-hover:text-accent transition-colors"
                        />
                      )}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary text-base group-hover:text-accent transition-colors mb-2">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </AnimatedSection>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
