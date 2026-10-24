'use client'

import { useEffect, useRef } from 'react'

/**
 * Animated "embedding space" behind the hero.
 *
 * Points are grouped into topic clouds, like texts with similar meaning end up close
 * together once they are turned into embedding vectors. The cursor acts as a search
 * query: it links to its nearest neighbours and shows a (decorative) similarity score,
 * which is how semantic search / RAG retrieval works.
 */

// Layout is designed on a 1280x800 frame and scaled to the real hero size
const BASE_W = 1280
const BASE_H = 800

const CLUSTERS = [
  { label: 'frontend', x: 170, y: 170 },
  { label: 'backend', x: 560, y: 130 },
  { label: 'apis', x: 960, y: 170 },
  { label: 'cloud', x: 1150, y: 380 },
  { label: 'llms', x: 760, y: 420 },
  { label: 'data', x: 330, y: 520 },
  { label: 'robots', x: 1000, y: 640 },
]
const POINTS_PER_CLUSTER = 70
const LOOSE_POINTS = 200
const NEIGHBOURS = 5
const REACH = 230 // px: how far the cursor "searches"
const MIN_LINK = 45 // px: ignore points glued to the cursor, their lines would be too short to read
const MIN_GAP = 40 // px: keep chosen neighbours apart so the score labels don't overlap

const ACCENT = '129, 140, 248' // --color-accent
const TEXT = '238, 240, 243' // --color-text-primary
const MUTED = '143, 148, 157' // --color-text-secondary

interface Point {
  hx: number // home position, in the 1280x800 design frame
  hy: number
  phase: number
  speed: number
  amp: number
}

/** Deterministic pseudo-random generator, so the layout is the same on every visit. */
function createRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}

function createPoints(): Point[] {
  const rand = createRandom(3)
  // Sum of 3 uniforms: a cheap approximation of a bell curve, so clouds are denser in the middle
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5
  const points: Point[] = []
  const add = (hx: number, hy: number, amp: number) =>
    points.push({ hx, hy, phase: rand() * Math.PI * 2, speed: 0.6 + rand() * 0.8, amp })

  for (const c of CLUSTERS) {
    for (let i = 0; i < POINTS_PER_CLUSTER; i++) add(c.x + gauss() * 120, c.y + gauss() * 80, 6 + rand() * 10)
  }
  // Loose points between the clouds, so the space feels continuous
  for (let i = 0; i < LOOSE_POINTS; i++) add(20 + rand() * 1240, 80 + rand() * 680, 8 + rand() * 12)
  return points
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !section || !ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const points = createPoints()
    const mouse = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let raf = 0
    let visible = true

    // Match the canvas to the hero size (sharp on retina screens too)
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = section.clientWidth
      height = section.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reducedMotion) draw(0)
    }

    const draw = (time: number) => {
      const t = time / 1000
      const sx = width / BASE_W
      const sy = height / BASE_H
      ctx.clearRect(0, 0, width, height)

      // Each point wanders around its home position at its own pace
      const pos = points.map((p) => ({
        x: (p.hx + Math.sin(t * 1.6 * p.speed + p.phase) * p.amp) * sx,
        y: (p.hy + Math.cos(t * 1.28 * p.speed + p.phase * 1.3) * p.amp * 0.8) * sy,
      }))

      // Nearest neighbours of the cursor: the "search results"
      const candidates = pos
        .map((p, i) => ({ i, d: Math.hypot(p.x - mouse.x, p.y - mouse.y) }))
        .filter((r) => r.d > MIN_LINK && r.d < REACH)
        .sort((a, b) => a.d - b.d)
      const nearest: typeof candidates = []
      for (const c of candidates) {
        const p = pos[c.i]
        const tooClose = nearest.some((n) => Math.hypot(pos[n.i].x - p.x, pos[n.i].y - p.y) < MIN_GAP)
        if (!tooClose) nearest.push(c)
        if (nearest.length === NEIGHBOURS) break
      }
      const hits = new Set(nearest.map((r) => r.i))

      ctx.lineWidth = 1
      ctx.setLineDash([3, 4])
      ctx.font = '400 10px "JetBrains Mono", monospace'
      for (const r of nearest) {
        const p = pos[r.i]
        ctx.strokeStyle = `rgba(${ACCENT}, 0.45)`
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        ctx.fillStyle = `rgba(${ACCENT}, 0.7)`
        // Score label just past the neighbour, pushed outwards along the line so labels don't collide
        const ux = (p.x - mouse.x) / r.d
        const uy = (p.y - mouse.y) / r.d
        ctx.fillText((1 - r.d / (REACH * 1.7)).toFixed(2), p.x + ux * 10 - 12, p.y + uy * 10 + 4)
      }
      ctx.setLineDash([])

      pos.forEach((p, i) => {
        const hit = hits.has(i)
        ctx.fillStyle = hit ? `rgba(${ACCENT}, 0.95)` : `rgba(${TEXT}, 0.12)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, hit ? 2.8 : 1.6, 0, Math.PI * 2)
        ctx.fill()
      })

      // Topic labels fade in only when the cursor gets close
      ctx.font = '400 11px "JetBrains Mono", monospace'
      for (const c of CLUSTERS) {
        const cx = c.x * sx
        const cy = c.y * sy
        const alpha = Math.max(0, 1 - Math.hypot(cx - mouse.x, cy - mouse.y) / 260) * 0.8
        if (alpha > 0.02) {
          ctx.fillStyle = `rgba(${MUTED}, ${alpha})`
          ctx.fillText(c.label, cx - 28, cy - 78 * sy)
        }
      }
    }

    const loop = (time: number) => {
      draw(time)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!reducedMotion && visible && !raf) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // The cursor is tracked on the whole hero, since the text sits on top of the canvas
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (reducedMotion) draw(0)
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
      if (reducedMotion) draw(0)
    }

    // Pause the animation while the hero is scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(section)
    observer.observe(section)
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    resize()
    start()

    return () => {
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
    />
  )
}
