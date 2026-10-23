import IsoBox from './IsoBox'
import { project } from './iso'
import { palette } from './palette'

interface RobotProps {
  x: number
  y: number
}

const BODY_W = 0.6
const BODY_D = 0.42
const LEG_H = 0.42
const LEG_SIZE = 0.09
const BODY_H = 0.28

/** A small, low-poly quadruped — an abstract nod to physical-AI robots, not a copy of any specific model. */
export default function Robot({ x, y }: RobotProps) {
  const legInset = 0.05
  const legs = [
    [x + legInset, y + legInset],
    [x + BODY_W - legInset - LEG_SIZE, y + legInset],
    [x + legInset, y + BODY_D - legInset - LEG_SIZE],
    [x + BODY_W - legInset - LEG_SIZE, y + BODY_D - legInset - LEG_SIZE],
  ]

  const headX = x + 0.1
  const headY = y - 0.14
  const headZ = LEG_H + BODY_H * 0.55
  const headW = 0.3
  const headD = 0.26
  const headH = 0.22

  const eye = project(headX + headW * 0.7, headY + headD, headZ + headH * 0.55)

  return (
    <g>
      {legs.map(([lx, ly], i) => (
        <IsoBox key={i} x={lx} y={ly} z={0} w={LEG_SIZE} d={LEG_SIZE} h={LEG_H} color={palette.robotJoint} />
      ))}

      <IsoBox x={x} y={y} z={LEG_H} w={BODY_W} d={BODY_D} h={BODY_H} color={palette.robotShell} />
      <IsoBox x={headX} y={headY} z={headZ} w={headW} d={headD} h={headH} color={palette.robotShade} />

      <circle cx={eye.x} cy={eye.y} r={7} fill={palette.robotEye} opacity={0.25} />
      <circle cx={eye.x} cy={eye.y} r={3} fill={palette.robotEye} />

      {/* small status antenna */}
      <line x1={eye.x - 20} y1={eye.y - 30} x2={eye.x - 20} y2={eye.y - 42} stroke={palette.robotJoint} strokeWidth={2} />
      <circle cx={eye.x - 20} cy={eye.y - 44} r={2.5} fill={palette.robotEye} />
    </g>
  )
}
