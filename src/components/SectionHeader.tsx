interface SectionHeaderProps {
  number: string
  title: string
}

export default function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-accent text-sm">{number}</span>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
        {title}
      </h2>
      <div className="flex-1 h-px bg-navy-lighter max-w-xs" />
    </div>
  )
}
