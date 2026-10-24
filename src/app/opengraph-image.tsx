import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getTranslations } from 'next-intl/server'

// Preview card shown when the link is shared (LinkedIn, WhatsApp, Slack...).
// Same look as the hero: big name, accent surname, faint "embedding space" dots.

export const alt = 'Chema Rodríguez, AI Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BG = '#0b0d12'
const TEXT = '#eef0f3'
const MUTED = '#8f949d'
const ACCENT = '#818cf8'

/** Deterministic dots, so the image is identical on every build. */
function createDots() {
  let state = 7
  const rand = () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
  return Array.from({ length: 160 }, () => ({ x: rand() * 1200, y: rand() * 630, r: 1.2 + rand() * 1.4 }))
}

// The cursor "query" and its nearest neighbours, drawn in the top-right corner
const QUERY = { x: 1010, y: 150 }
const NEIGHBOURS = [
  { x: 930, y: 95, score: '0.91' },
  { x: 1105, y: 110, score: '0.87' },
  { x: 1080, y: 228, score: '0.84' },
  { x: 945, y: 215, score: '0.79' },
]

export default async function Image() {
  const t = await getTranslations('hero')

  const [display, mono] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/space-grotesk-latin-700-normal.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/jetbrains-mono-latin-400-normal.ttf')),
  ])

  const label = { fontFamily: 'JetBrains Mono', fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase' } as const

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: BG }}>
        <svg width="1200" height="630" style={{ position: 'absolute', top: 0, left: 0 }}>
          {createDots().map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={TEXT} fillOpacity={0.1} />
          ))}
          {NEIGHBOURS.map((n) => (
            <line
              key={n.score}
              x1={QUERY.x}
              y1={QUERY.y}
              x2={n.x}
              y2={n.y}
              stroke={ACCENT}
              strokeOpacity={0.5}
              strokeDasharray="4 5"
            />
          ))}
          {NEIGHBOURS.map((n) => (
            <circle key={n.score} cx={n.x} cy={n.y} r={4} fill={ACCENT} />
          ))}
        </svg>

        {NEIGHBOURS.map((n) => (
          <div
            key={n.score}
            style={{
              position: 'absolute',
              left: n.x + (n.x > QUERY.x ? 10 : -58),
              top: n.y + (n.y > QUERY.y ? 6 : -26),
              fontFamily: 'JetBrains Mono',
              fontSize: 15,
              color: ACCENT,
              opacity: 0.8,
            }}
          >
            {n.score}
          </div>
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '64px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: TEXT, ...label }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: ACCENT }} />
            {t('role_label')}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 44,
              fontFamily: 'Space Grotesk',
              fontSize: 150,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            <div style={{ color: TEXT }}>{t('name')}</div>
            <div style={{ display: 'flex', alignItems: 'center', color: ACCENT }}>
              {t('surname')}
              <div style={{ width: 18, height: 108, marginLeft: 20, marginTop: 10, background: ACCENT }} />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: 'auto',
              paddingTop: 32,
              borderTop: '1px solid rgba(238, 240, 243, 0.12)',
            }}
          >
            {/* Same wordmark as the navbar logo */}
            <div style={{ display: 'flex', color: TEXT, ...label, textTransform: 'none', letterSpacing: '0.04em' }}>
              chema<span style={{ color: ACCENT }}>.</span>rodríguez
            </div>
            <div style={{ color: MUTED, ...label, textTransform: 'none', letterSpacing: '0.12em' }}>
              {t('location')}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Space Grotesk', data: display, style: 'normal', weight: 700 },
        { name: 'JetBrains Mono', data: mono, style: 'normal', weight: 400 },
      ],
    }
  )
}
