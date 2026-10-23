import IsoBox from './IsoBox'
import { palette } from './palette'

export const DESK_WIDTH = 6.2
export const DESK_DEPTH = 2.0
export const DESK_HEIGHT = 2.2
export const DESK_TOP_THICKNESS = 0.15
export const DESK_SURFACE_Z = DESK_HEIGHT + DESK_TOP_THICKNESS

const LEG_SIZE = 0.22
const LEG_INSET_X = 0.3
const LEG_INSET_Y = 0.22

interface DeskProps {
  x: number
  y: number
}

export default function Desk({ x, y }: DeskProps) {
  const legs = [
    [x + LEG_INSET_X, y + LEG_INSET_Y],
    [x + DESK_WIDTH - LEG_INSET_X - LEG_SIZE, y + LEG_INSET_Y],
    [x + LEG_INSET_X, y + DESK_DEPTH - LEG_INSET_Y - LEG_SIZE],
    [x + DESK_WIDTH - LEG_INSET_X - LEG_SIZE, y + DESK_DEPTH - LEG_INSET_Y - LEG_SIZE],
  ]

  return (
    <g>
      {legs.map(([lx, ly], i) => (
        <IsoBox key={i} x={lx} y={ly} z={0} w={LEG_SIZE} d={LEG_SIZE} h={DESK_HEIGHT} color={palette.deskLeg} />
      ))}
      <IsoBox x={x} y={y} z={DESK_HEIGHT} w={DESK_WIDTH} d={DESK_DEPTH} h={DESK_TOP_THICKNESS} color={palette.deskTop} />
    </g>
  )
}
