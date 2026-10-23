import { project } from './iso'
import { palette } from './palette'

interface DogProps {
  x: number
  y: number
}

/**
 * A curled, sleeping samoyed. Built directly in screen space (rather than the
 * grid) since a soft organic silhouette reads better as layered ellipses than
 * as iso boxes.
 */
export default function Dog({ x, y }: DogProps) {
  const p = project(x, y, 0)

  return (
    <g>
      <ellipse cx={p.x} cy={p.y + 4} rx={40} ry={12} fill="url(#contactShadow)" />

      {/* rear haunch */}
      <ellipse cx={p.x - 20} cy={p.y - 10} rx={22} ry={17} fill={palette.dogShade} />
      {/* main body */}
      <ellipse cx={p.x + 4} cy={p.y - 16} rx={32} ry={21} fill={palette.dogCoat} />
      {/* curled tail resting over the body */}
      <path
        d={`M ${p.x - 38} ${p.y - 12} Q ${p.x - 44} ${p.y - 34}, ${p.x - 14} ${p.y - 34}`}
        stroke={palette.dogShade}
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
      />
      {/* head tucked down, resting on paws */}
      <ellipse cx={p.x + 26} cy={p.y - 22} rx={15} ry={12.5} fill={palette.dogCoat} />
      <ellipse cx={p.x + 32} cy={p.y - 30} rx={5} ry={6} fill={palette.dogShade} />
      {/* nose + closed eye */}
      <ellipse cx={p.x + 38} cy={p.y - 20} rx={2.4} ry={1.8} fill={palette.dogNose} />
      <path d={`M ${p.x + 25} ${p.y - 24} q 3 2 6 0`} stroke={palette.dogNose} strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </g>
  )
}
