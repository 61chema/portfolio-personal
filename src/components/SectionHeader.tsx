interface SectionHeaderProps {
  number: string
  title: string
}

/** Big section title with its number as a small label above, sized to match the hero. */
export default function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="mb-14 md:mb-20">
      <span className="font-mono text-[13px] tracking-[0.18em] text-accent">{number}</span>
      <h2 className="mt-4 font-display text-5xl md:text-[4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-text-primary">
        {title}
      </h2>
    </div>
  )
}
