import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="py-8 px-6 text-center border-t border-navy-lighter/30">
      <p className="font-mono text-xs text-text-secondary">
        {t('designed')}{' '}
        <span className="text-accent">{t('name')}</span>
      </p>
    </footer>
  )
}
