'use client'

interface TechMarqueeProps {
  items: string[]
  direction?: 'left' | 'right'
  speed?: number
}

const MIN_TRACK_ITEMS = 8

export default function TechMarquee({ items, direction = 'left', speed = 24 }: TechMarqueeProps) {
  const repeatCount = Math.max(1, Math.ceil(MIN_TRACK_ITEMS / items.length))
  const base = Array.from({ length: repeatCount }, () => items).flat()
  const track = [...base, ...base]

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className={`flex w-max gap-2 group-hover:[animation-play-state:paused] ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((tech, idx) => (
          <span
            key={`${tech}-${idx}`}
            className="shrink-0 font-mono text-xs text-text-secondary bg-navy-light border border-navy-lighter px-3 py-1.5 rounded hover:border-accent hover:text-accent transition-all duration-200 cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
