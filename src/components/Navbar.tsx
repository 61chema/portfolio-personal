'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocaleSwitch } from '@/providers/LocaleProvider'
import { motion } from 'framer-motion'

export default function Navbar() {
  const t = useTranslations('nav')
  const { locale, setLocale } = useLocaleSwitch()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'es' : 'en')
  }

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#experience', label: t('experience') },
    { href: '#projects', label: t('projects') },
    { href: '#education', label: t('education') },
    { href: '#contact', label: t('contact') },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/90 backdrop-blur-md shadow-lg shadow-navy/50 border-b border-navy-lighter/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-mono text-accent text-sm font-medium tracking-wider hover:opacity-80 transition-opacity"
        >
          chema.
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ol className="flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1 text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ol>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="font-mono text-xs text-text-secondary hover:text-accent border border-text-secondary/30 hover:border-accent px-3 py-1.5 rounded transition-all duration-200"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="font-mono text-xs text-text-secondary hover:text-accent border border-text-secondary/30 hover:border-accent px-2 py-1 rounded transition-all duration-200"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text-secondary hover:text-accent transition-colors p-1"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-navy-light border-t border-navy-lighter/30 px-6 py-6"
        >
          <ol className="flex flex-col gap-4 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </motion.nav>
  )
}
