import IsoBox from './IsoBox'
import { pointsAttr, verticalPlaneQuad } from './iso'
import { palette } from './palette'

interface MonitorProps {
  x: number
  y: number
  z: number
  width?: number
  height?: number
  standHeight?: number
}

const DEPTH = 0.12
const STAND_WIDTH = 0.16

export default function Monitor({ x, y, z, width = 1.3, height = 1.0, standHeight = 0.32 }: MonitorProps) {
  const standX = x + width / 2 - STAND_WIDTH / 2
  const screenZ = z + standHeight
  const screenY = y + DEPTH

  const screenFace = verticalPlaneQuad(screenY, x, x + width, screenZ, screenZ + height)

  const codeLines = [
    { wRatio: 0.55, zRatio: 0.72 },
    { wRatio: 0.35, zRatio: 0.56 },
    { wRatio: 0.62, zRatio: 0.4 },
    { wRatio: 0.28, zRatio: 0.24 },
  ]

  return (
    <g>
      {/* base + neck */}
      <IsoBox x={x + width * 0.35} y={y - 0.06} z={z} w={width * 0.3} d={0.28} h={0.05} color={palette.monitorBezel} />
      <IsoBox x={standX} y={y + DEPTH * 0.2} z={z} w={STAND_WIDTH} d={DEPTH * 1.4} h={standHeight} color={palette.monitorBezel} />

      {/* bezel */}
      <IsoBox x={x} y={y} z={screenZ} w={width} d={DEPTH} h={height} color={palette.monitorBezel} />

      {/* screen */}
      <polygon points={pointsAttr(screenFace)} fill="url(#screenGlow)" />
      <polygon points={pointsAttr(screenFace)} fill="none" stroke={palette.screenGlow} strokeOpacity={0.3} strokeWidth={1} />

      {/* faint code lines, purely decorative */}
      {codeLines.map((line, i) => {
        const lineX0 = x + width * 0.12
        const lineZ0 = screenZ + height * line.zRatio
        const quad = verticalPlaneQuad(screenY, lineX0, lineX0 + width * line.wRatio, lineZ0, lineZ0 + height * 0.06)
        return <polygon key={i} points={pointsAttr(quad)} fill={palette.screenGlow} fillOpacity={0.35} />
      })}
    </g>
  )
}
