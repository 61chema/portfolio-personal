/**
 * Shared isometric projection for the hero scene. Every component places its
 * shapes in the same abstract grid (x = right, y = depth/left, z = up) and
 * projects them through `project()` so perspective stays consistent across
 * independently authored components.
 */

export const TILE = 34
export const Z_TILE = 30

const COS30 = Math.cos(Math.PI / 6)
const SIN30 = Math.sin(Math.PI / 6)

export interface Point {
  x: number
  y: number
}

export function project(x: number, y: number, z = 0): Point {
  return {
    x: (x - y) * COS30 * TILE,
    y: (x + y) * SIN30 * TILE - z * Z_TILE,
  }
}

export function pointsAttr(points: Point[]): string {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
}

export interface BoxFaces {
  top: Point[]
  right: Point[]
  left: Point[]
}

/**
 * The three faces of an axis-aligned box that are visible under this fixed
 * camera: top, the +x face ("right") and the +y face ("left"). The other
 * three faces are always turned away from the viewer and are skipped.
 */
export function boxFaces(x: number, y: number, z: number, w: number, d: number, h: number): BoxFaces {
  const x0 = x
  const x1 = x + w
  const y0 = y
  const y1 = y + d
  const z0 = z
  const z1 = z + h

  return {
    top: [project(x0, y0, z1), project(x1, y0, z1), project(x1, y1, z1), project(x0, y1, z1)],
    right: [project(x1, y0, z0), project(x1, y1, z0), project(x1, y1, z1), project(x1, y0, z1)],
    left: [project(x0, y1, z0), project(x1, y1, z0), project(x1, y1, z1), project(x0, y1, z1)],
  }
}

/** A single flat quad on the y = const plane, e.g. a monitor screen. */
export function verticalPlaneQuad(y: number, x0: number, x1: number, z0: number, z1: number): Point[] {
  return [project(x0, y, z0), project(x1, y, z0), project(x1, y, z1), project(x0, y, z1)]
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n))
}

/** Lightens (amount > 0) or darkens (amount < 0) a hex color toward white/black. */
export function shade(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  const target = amount < 0 ? 0 : 255
  const p = clamp01(Math.abs(amount))

  const mix = (channel: number) => Math.round(channel + (target - channel) * p)

  return `#${[mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}
