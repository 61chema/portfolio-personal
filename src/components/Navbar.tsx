'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useLocaleSwitch } from '@/providers/LocaleProvider'
import { motion } from 'framer-motion'

export default function Navbar() {
  const t = useTranslations('nav')
  const { locale, setLocale } = useLocaleSwitch()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'es' : 'en')
  }

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#projects', label: t('projects') },
    { href: '#experience', label: t('experience') },
    { href: '#contact', label: t('contact') },
  ]

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-line"
    >
      {/* Mobile: logo | controls. Desktop: three columns, logo | centered links | controls */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#hero"
          className="justify-self-start font-mono text-sm text-text-primary tracking-wide hover:opacity-80 transition-opacity"
        >
          chema<span className="text-accent">.</span>rodríguez
        </a>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden md:block">
          <ol className="flex items-center gap-9 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="justify-self-end flex items-center gap-3">
          {/* Language toggle: shows the language you would switch to */}
          <button
            onClick={toggleLanguage}
            className="font-mono text-xs tracking-[0.18em] text-text-secondary hover:text-text-primary border border-line hover:border-text-secondary/50 rounded-full min-w-11 h-9 px-3 transition-colors duration-200"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.nav
          aria-label="Main"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-line px-6 py-6"
        >
          <ol className="flex flex-col gap-5 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>
      )}
    </motion.header>
  )
}
