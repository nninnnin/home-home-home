import { useRef, useCallback, useEffect } from 'react'
import { Vector3 } from 'three'
import type { CameraBehavior } from '../lib/cameraBehavior'

const ROTATE_SPEED = 0.005

const state = { dx: 0 }

export const rotateYBehavior: CameraBehavior = {
  id: 'rotateY',
  onFrame: ({ camera, controls }) => {
    if (state.dx === 0) return

    const target: Vector3 = controls?.target ?? new Vector3()
    const offset = camera.position.clone().sub(target)
    offset.applyAxisAngle(new Vector3(0, 1, 0), -state.dx * ROTATE_SPEED)
    camera.position.copy(target).add(offset)
    camera.lookAt(target)

    state.dx = 0
  },
}

export function RotateYButton() {
  const btnRef = useRef<HTMLDivElement>(null)
  const active = useRef(false)
  const prev = useRef(0)

  useEffect(() => {
    const reset = () => {
      if (!active.current) return
      active.current = false
      if (btnRef.current) btnRef.current.style.cursor = 'ew-resize'
    }
    window.addEventListener('pointerup', reset)
    return () => window.removeEventListener('pointerup', reset)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    active.current = true
    prev.current = e.clientX
    ;(e.currentTarget as HTMLElement).style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!active.current) return
    state.dx += e.clientX - prev.current
    prev.current = e.clientX
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    active.current = false
    ;(e.currentTarget as HTMLElement).style.cursor = 'ew-resize'
  }, [])

  return (
    <div
      ref={btnRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      title="Rotate Y"
      style={{
        position: 'fixed',
        top: '50%',
        right: 104,
        transform: 'translateY(-50%)',
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(255,255,255,0.18)',
        cursor: 'ew-resize',
        touchAction: 'none',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
        <path d="M1 5h16M1 5l3-3M1 5l3 3M17 5l-3-3M17 5l-3 3"
          stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}
