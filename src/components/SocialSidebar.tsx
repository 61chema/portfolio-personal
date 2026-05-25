'use client'

import { motion } from 'framer-motion'
import { Mail, FileText } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons/SocialIcons'
import { SOCIAL, CV_FILE } from '@/lib/social'

const leftLinks = [
  {
    href: SOCIAL.github,
    label: 'GitHub',
    icon: <GitHubIcon size={18} />,
    external: true,
  },
  {
    href: SOCIAL.linkedin,
    label: 'LinkedIn',
    icon: <LinkedInIcon size={18} />,
    external: true,
  },
  {
    href: `mailto:${SOCIAL.email}`,
    label: 'Email',
    icon: <Mail size={18} />,
    external: false,
  },
]

export default function SocialSidebar() {
  return (
    <>
      {/* Left sidebar — social icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed bottom-0 left-8 hidden md:flex flex-col items-center gap-5 z-40"
      >
        {leftLinks.map(({ href, label, icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-text-secondary hover:text-accent hover:-translate-y-1 transition-all duration-200"
          >
            {icon}
          </a>
        ))}
        {/* Vertical line */}
        <div className="w-px h-20 bg-text-secondary/30" />
      </motion.div>

      {/* Right sidebar — CV download */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed bottom-0 right-8 hidden md:flex flex-col items-center gap-5 z-40"
      >
        <a
          href={CV_FILE.href}
          download={CV_FILE.downloadName}
          aria-label="Download CV"
          className="text-text-secondary hover:text-accent hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-2"
        >
          <FileText size={18} />
          <span
            className="font-mono text-xs tracking-widest"
            style={{ writingMode: 'vertical-rl' }}
          >
            CV
          </span>
        </a>
        {/* Vertical line */}
        <div className="w-px h-20 bg-text-secondary/30" />
      </motion.div>
    </>
  )
}
