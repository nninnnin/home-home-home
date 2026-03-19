import { useState, useEffect } from 'react'

export function SaveToast() {
  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    let fadeOut: ReturnType<typeof setTimeout>

    const onSaved = () => {
      clearTimeout(fadeOut)
      setVisible(true)
      setOpacity(1)
      fadeOut = setTimeout(() => setOpacity(0), 1200)
    }

    window.addEventListener('camera-saved', onSaved)
    return () => {
      window.removeEventListener('camera-saved', onSaved)
      clearTimeout(fadeOut)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      onTransitionEnd={() => { if (opacity === 0) setVisible(false) }}
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(8px)',
        color: 'rgba(255,255,255,0.85)',
        fontSize: 12,
        padding: '6px 14px',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.12)',
        opacity,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: 200,
      }}
    >
      저장됨
    </div>
  )
}
