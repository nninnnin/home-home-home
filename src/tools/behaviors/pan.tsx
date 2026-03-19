import { useRef, useCallback, useEffect } from 'react'
import { Vector3 } from 'three'
import type { CameraBehavior } from '../../lib/cameraBehavior'

const PAN_SPEED = 0.012

const state = { dx: 0, dy: 0 }

export const panBehavior: CameraBehavior = {
  id: 'pan',
  onFrame: ({ camera, controls }) => {
    if (state.dx === 0 && state.dy === 0) return

    const right = new Vector3()
    const up = new Vector3()
    camera.matrix.extractBasis(right, up, new Vector3())

    const pan = new Vector3()
      .addScaledVector(right, -state.dx * PAN_SPEED)
      .addScaledVector(up,     state.dy * PAN_SPEED)

    camera.position.add(pan)
    controls?.target?.add(pan)

    state.dx = 0
    state.dy = 0
  },
}

export function PanButton() {
  const btnRef = useRef<HTMLDivElement>(null)
  const active = useRef(false)
  const prev = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const reset = () => {
      if (!active.current) return
      active.current = false
      if (btnRef.current) btnRef.current.style.cursor = 'grab'
    }
    window.addEventListener('pointerup', reset)
    return () => window.removeEventListener('pointerup', reset)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    active.current = true
    prev.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as HTMLElement).style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!active.current) return
    state.dx += e.clientX - prev.current.x
    state.dy += e.clientY - prev.current.y
    prev.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    active.current = false
    ;(e.currentTarget as HTMLElement).style.cursor = 'grab'
  }, [])

  return (
    <div
      ref={btnRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      title="Pan"
      style={{
        position: 'fixed',
        top: 16,
        right: 180,
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(255,255,255,0.18)',
        cursor: 'grab',
        touchAction: 'none',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1v14M1 8h14M8 1L5 4M8 1l3 3M8 15l-3-3M8 15l3-3M1 8l3-3M1 8l3 3M15 8l-3-3M15 8l-3 3"
          stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </div>
  )
}
