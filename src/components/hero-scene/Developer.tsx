import IsoBox from './IsoBox'
import { palette } from './palette'

interface DeveloperProps {
  x: number
  y: number
}

const SEAT_SIZE = 0.9
const SEAT_Z = 1.0

/** Chair + seated figure, built from stacked boxes. Legs are omitted — the desk hides them anyway. */
export default function Developer({ x, y }: DeveloperProps) {
  const chairPostX = x + SEAT_SIZE / 2 - 0.075
  const chairPostY = y + SEAT_SIZE / 2 - 0.075

  const torsoX = x + 0.15
  const torsoY = y + 0.15
  const torsoW = 0.6
  const torsoD = 0.5
  const torsoZ = SEAT_Z + 0.15
  const torsoH = 0.75

  const headW = 0.4
  const headD = 0.4
  const headX = x + 0.25
  const headY = y + 0.2
  const headZ = torsoZ + torsoH

  const armY = torsoY - 0.35 // reaching toward the desk (smaller y)

  return (
    <g>
      {/* chair */}
      <IsoBox x={chairPostX} y={chairPostY} z={0} w={0.15} d={0.15} h={SEAT_Z} color={palette.chairFrame} />
      <IsoBox x={x} y={y} z={SEAT_Z} w={SEAT_SIZE} d={SEAT_SIZE} h={0.15} color={palette.chairPad} />
      <IsoBox x={x} y={y + SEAT_SIZE - 0.15} z={SEAT_Z + 0.15} w={SEAT_SIZE} d={0.15} h={1.0} color={palette.chairPad} />

      {/* torso */}
      <IsoBox x={torsoX} y={torsoY} z={torsoZ} w={torsoW} d={torsoD} h={torsoH} color={palette.hoodie} />

      {/* arms reaching toward the keyboard */}
      <IsoBox x={torsoX - 0.05} y={torsoY + 0.05} z={torsoZ + 0.35} w={0.16} d={0.16} h={0.3} color={palette.hoodie} />
      <IsoBox x={torsoX - 0.05} y={armY} z={torsoZ + 0.24} w={0.16} d={0.45} h={0.16} color={palette.skin} />

      <IsoBox x={torsoX + torsoW - 0.11} y={torsoY + 0.05} z={torsoZ + 0.35} w={0.16} d={0.16} h={0.3} color={palette.hoodie} />
      <IsoBox x={torsoX + torsoW - 0.11} y={armY} z={torsoZ + 0.24} w={0.16} d={0.45} h={0.16} color={palette.skin} />

      {/* head + hair */}
      <IsoBox x={headX} y={headY} z={headZ} w={headW} d={headD} h={0.4} color={palette.skin} />
      <IsoBox x={headX - 0.02} y={headY - 0.02} z={headZ + 0.28} w={headW + 0.04} d={headD - 0.1} h={0.16} color={palette.hair} />
    </g>
  )
}
