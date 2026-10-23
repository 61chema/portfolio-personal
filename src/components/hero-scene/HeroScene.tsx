import Desk, { DESK_SURFACE_Z } from './Desk'
import Monitor from './Monitor'
import Lamp from './Lamp'
import DeskAccessories from './DeskAccessories'
import Developer from './Developer'
import Dog from './Dog'
import Robot from './Robot'
import { project } from './iso'
import { palette } from './palette'

// Scene layout, all in shared grid units. Kept in one place so the desk,
// monitors, accessories and characters stay visually aligned.
const DESK_ORIGIN = { x: 1.6, y: 0.7 }
const LAMP_ORIGIN = { x: 1.85, y: 0.85 }
const MONITORS = [
  { x: 2.0, y: 0.95, width: 1.05, height: 0.8, standHeight: 0.3 },
  { x: 3.5, y: 0.8, width: 1.5, height: 1.05, standHeight: 0.35 },
  { x: 5.6, y: 0.95, width: 1.05, height: 0.8, standHeight: 0.3 },
]
const DEVELOPER_ORIGIN = { x: 4.25, y: 3.6 }
const DOG_ORIGIN = { x: 3.0, y: 4.0 }
const ROBOT_ORIGIN = { x: 7.6, y: 3.4 }

const CANVAS_SIZE = 640
const CONTENT_CENTER = project(2.9, 1.9, 1.3) // rough visual centroid of the scene
const ORIGIN_OFFSET = {
  x: CANVAS_SIZE / 2 - CONTENT_CENTER.x,
  y: CANVAS_SIZE / 2 - CONTENT_CENTER.y - 20,
}

function groundShadow(x: number, y: number, rx: number, ry: number) {
  const p = project(x, y, 0)
  return <ellipse cx={p.x} cy={p.y} rx={rx} ry={ry} fill="url(#contactShadow)" />
}

export default function HeroScene() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto md:mx-0 aspect-square">
      <svg
        viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Escena isométrica de un escritorio de desarrollador con tres monitores, una lámpara, un samoyedo dormido y un pequeño robot cuadrúpedo"
      >
        <defs>
          <radialGradient id="screenGlow" cx="35%" cy="28%" r="85%">
            <stop offset="0%" stopColor={palette.screenGlow} stopOpacity="0.85" />
            <stop offset="100%" stopColor={palette.screenGlow} stopOpacity="0.12" />
          </radialGradient>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.lampWarm} stopOpacity="0.6" />
            <stop offset="100%" stopColor={palette.lampWarm} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="contactShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.shadow} stopOpacity="0.35" />
            <stop offset="100%" stopColor={palette.shadow} stopOpacity="0" />
          </radialGradient>
        </defs>

        <g transform={`translate(${ORIGIN_OFFSET.x} ${ORIGIN_OFFSET.y})`}>
          {/* contact shadows, drawn first so every object sits on top */}
          {groundShadow(DESK_ORIGIN.x + 2, DESK_ORIGIN.y + 1.3, 150, 42)}
          {groundShadow(DEVELOPER_ORIGIN.x + 0.45, DEVELOPER_ORIGIN.y + 0.45, 55, 24)}
          {groundShadow(ROBOT_ORIGIN.x + 0.3, ROBOT_ORIGIN.y + 0.2, 42, 16)}

          <Lamp x={LAMP_ORIGIN.x} y={LAMP_ORIGIN.y} z={DESK_SURFACE_Z} />
          <Desk x={DESK_ORIGIN.x} y={DESK_ORIGIN.y} />

          {MONITORS.map((m, i) => (
            <Monitor key={i} x={m.x} y={m.y} z={DESK_SURFACE_Z} width={m.width} height={m.height} standHeight={m.standHeight} />
          ))}
          <DeskAccessories x={DESK_ORIGIN.x} y={DESK_ORIGIN.y} z={DESK_SURFACE_Z} />

          <Dog x={DOG_ORIGIN.x} y={DOG_ORIGIN.y} />
          <Robot x={ROBOT_ORIGIN.x} y={ROBOT_ORIGIN.y} />
          <Developer x={DEVELOPER_ORIGIN.x} y={DEVELOPER_ORIGIN.y} />
        </g>
      </svg>
    </div>
  )
}
