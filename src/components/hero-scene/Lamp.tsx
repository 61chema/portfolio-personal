import IsoBox from './IsoBox'
import { project } from './iso'
import { palette } from './palette'

interface LampProps {
  x: number
  y: number
  z: number
}

/** A simple articulated desk lamp built from straight segments — the warm light source of the scene. */
export default function Lamp({ x, y, z }: LampProps) {
  const postHeight = 1.5
  const armLength = 1.1
  const headX = x + 0.15 + armLength
  const headY = y + 0.05
  const headZ = z + postHeight + 0.06 - 0.18

  const glowCenter = project(headX + 0.15, headY + 0.12, headZ + 0.05)

  return (
    <g>
      {/* warm ambient pool cast on the desk, drawn first so everything else sits on top of it */}
      <ellipse cx={glowCenter.x} cy={glowCenter.y + 60} rx={130} ry={55} fill="url(#lampGlow)" />

      <IsoBox x={x} y={y} z={z} w={0.32} d={0.32} h={0.06} color={palette.lampBody} />
      <IsoBox x={x + 0.09} y={y + 0.09} z={z + 0.06} w={0.14} d={0.14} h={postHeight} color={palette.lampBody} />
      <IsoBox x={x + 0.09} y={y + 0.05} z={z + postHeight} w={armLength} d={0.12} h={0.1} color={palette.lampBody} />
      <IsoBox x={headX} y={headY} z={headZ} w={0.34} d={0.3} h={0.2} color={palette.lampBody} topColor={palette.lampWarm} />

      <circle cx={glowCenter.x} cy={glowCenter.y} r={22} fill="url(#lampGlow)" />
      <circle cx={glowCenter.x} cy={glowCenter.y} r={5} fill={palette.lampWarm} />
    </g>
  )
}
