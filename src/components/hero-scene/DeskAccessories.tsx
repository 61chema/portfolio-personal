import IsoBox from './IsoBox'
import { project } from './iso'
import { palette } from './palette'

interface DeskAccessoriesProps {
  x: number
  y: number
  z: number
}

function Mug({ x, y, z }: { x: number; y: number; z: number }) {
  const anchor = project(x, y, z)
  const rimRy = 6

  return (
    <g>
      <path
        d={`M ${anchor.x - 9} ${anchor.y} L ${anchor.x - 7} ${anchor.y - 20} A 7 ${rimRy} 0 0 1 ${anchor.x + 7} ${anchor.y - 20} L ${anchor.x + 9} ${anchor.y} Z`}
        fill={palette.mugBody}
      />
      <ellipse cx={anchor.x} cy={anchor.y - 20} rx={7} ry={rimRy} fill={palette.mugRim} />
      <path
        d={`M ${anchor.x + 9} ${anchor.y - 14} q 8 2 0 10`}
        stroke={palette.mugBody}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  )
}

const OFFSETS = {
  keyboard: { x: 1.3, y: 1.35 },
  mouse: { x: 3.25, y: 1.4 },
  mug: { x: 0.35, y: 1.55 },
}

export default function DeskAccessories({ x, y, z }: DeskAccessoriesProps) {
  const keyboardX = x + OFFSETS.keyboard.x
  const keyboardY = y + OFFSETS.keyboard.y
  const mouseX = x + OFFSETS.mouse.x
  const mouseY = y + OFFSETS.mouse.y
  const mugX = x + OFFSETS.mug.x
  const mugY = y + OFFSETS.mug.y

  return (
    <g>
      <IsoBox x={keyboardX} y={keyboardY} z={z} w={1.7} d={0.55} h={0.07} color={palette.keyboard} />
      <IsoBox x={keyboardX + 0.06} y={keyboardY + 0.06} z={z + 0.07} w={1.58} d={0.43} h={0.03} color={palette.key} />

      <IsoBox x={mouseX} y={mouseY} z={z} w={0.28} d={0.42} h={0.1} color={palette.mouse} />

      <Mug x={mugX} y={mugY} z={z + 0.02} />
    </g>
  )
}
