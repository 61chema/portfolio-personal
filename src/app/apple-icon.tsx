import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Same "c." monogram as icon.svg, without rounded corners: iOS rounds them itself
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0b0d12' }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path
            d="M19.1 11.2 A7 7 0 1 0 19.1 20.8"
            fill="none"
            stroke="#eef0f3"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <circle cx="24.6" cy="21" r="2.4" fill="#818cf8" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
