import { boxFaces, pointsAttr, shade } from './iso'

export interface IsoBoxProps {
  x: number
  y: number
  z: number
  w: number
  d: number
  h: number
  color: string
  topColor?: string
  rightColor?: string
  leftColor?: string
}

/** A generic axis-aligned box in the shared iso grid, auto-shaded from a single base color. */
export default function IsoBox({ x, y, z, w, d, h, color, topColor, rightColor, leftColor }: IsoBoxProps) {
  const faces = boxFaces(x, y, z, w, d, h)

  return (
    <g>
      <polygon points={pointsAttr(faces.left)} fill={leftColor ?? shade(color, -0.22)} />
      <polygon points={pointsAttr(faces.right)} fill={rightColor ?? shade(color, -0.08)} />
      <polygon points={pointsAttr(faces.top)} fill={topColor ?? shade(color, 0.22)} />
    </g>
  )
}
