'use client'

import { motion, type Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowDown } from 'lucide-react'
import HeroScene from './hero-scene/HeroScene'

export default function Hero() {
  const t = useTranslations('hero')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-0 -mt-16"
    >
      <div className="grid md:grid-cols-[1.3fr_1fr] items-center gap-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-accent text-sm mb-4 tracking-wider"
          >
            {t('greeting')}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-tight mb-4"
          >
            {t('name')}.
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-secondary leading-tight mb-6"
          >
            {t('role')}.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-lg max-w-xl mb-10 leading-relaxed"
          >
            {t('tagline')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 border border-accent text-accent px-6 py-3 rounded font-mono text-sm hover:bg-accent/10 transition-all duration-200"
            >
              {t('cta_work')}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent px-6 py-3 font-mono text-sm transition-colors duration-200"
            >
              {t('cta_contact')} →
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="hidden md:flex justify-center md:justify-end"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary"
      >
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
