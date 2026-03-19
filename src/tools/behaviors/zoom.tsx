import type { MutableRefObject } from 'react'
import type { CameraBehavior } from '../../lib/cameraBehavior'

const MIN_FOV = 20
const MAX_FOV = 90

export function makeZoomBehavior(fovRef: MutableRefObject<number>): CameraBehavior {
  return {
    id: 'zoom',
    onFrame: ({ camera }) => {
      if (!('fov' in camera)) return
      const cam = camera as any
      if (cam.fov === fovRef.current) return
      cam.fov = fovRef.current
      cam.updateProjectionMatrix()
    },
  }
}

interface ZoomUIProps {
  fov: number
  onChange: (fov: number) => void
}

export function ZoomControlsUI({ fov, onChange }: ZoomUIProps) {
  const step = 5

  return (
    <div style={{
      position: 'fixed',
      top: 16,
      right: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(0,0,0,0.45)',
      backdropFilter: 'blur(8px)',
      borderRadius: 10,
      padding: '6px 10px',
      userSelect: 'none',
      zIndex: 100,
    }}>
      <button onClick={() => onChange(Math.min(fov + step, MAX_FOV))} style={btnStyle} title="Zoom out">−</button>
      <span style={{ color: '#fff', fontSize: 12, minWidth: 36, textAlign: 'center', opacity: 0.8 }}>
        {fov}°
      </span>
      <button onClick={() => onChange(Math.max(fov - step, MIN_FOV))} style={btnStyle} title="Zoom in">+</button>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: 18,
  cursor: 'pointer',
  lineHeight: 1,
  padding: '0 4px',
  opacity: 0.8,
}
