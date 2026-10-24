'use client'

import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'
import HeroBackground from './HeroBackground'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'

/**
 * Shows `text` as random glyphs that "decrypt" letter by letter into the real text.
 * Runs once per text change; skipped when the user prefers reduced motion.
 */
function useDecrypt(text: string) {
  const [output, setOutput] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(text)
      return
    }

    let frame = 0
    const timer = setInterval(() => {
      frame++
      // Each letter locks in a bit later than the previous one
      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ' || frame > 6 + i) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setOutput(next)
      if (next === text) clearInterval(timer)
    }, 40)

    return () => clearInterval(timer)
  }, [text])

  return output
}

export default function Hero() {
  const t = useTranslations('hero')
  const role = useDecrypt(t('role_label'))

  // One orchestrated entrance: the blocks appear one after another on load
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Embedding-space animation, drawn behind the content */}
      <HeroBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16"
      >
        <motion.p
          variants={itemVariants}
          className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.18em] text-text-primary"
        >
          <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span aria-label={t('role_label')}>{role}</span>
        </motion.p>

        {/* Big name, two lines; the surname carries the accent colour */}
        <motion.h1
          variants={itemVariants}
          className="mt-8 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[clamp(3.5rem,11vw,10.5rem)]"
        >
          <span className="block text-text-primary">{t('name')}</span>
          <span className="block text-accent">
            {t('surname')}
            <span
              className="caret-blink ml-3 inline-block h-[0.72em] w-[0.12em] translate-y-[0.06em] bg-accent"
              aria-hidden="true"
            />
          </span>
        </motion.h1>

        <motion.hr variants={itemVariants} className="mt-14 border-line" />

        {/* Bottom row: intro on the left, location on the right */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
        >
          <p className="max-w-xl text-base md:text-lg leading-relaxed text-text-body">{t('tagline')}</p>
          <p className="font-mono text-[13px] tracking-[0.12em] text-text-secondary">{t('location')}</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
