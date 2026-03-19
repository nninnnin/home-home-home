import { useState, useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Room from './components/Room'
import { CameraController } from './components/CameraController'
import { CameraStatePersist, loadCameraState } from './components/CameraStatePersist'
import { SaveToast } from './components/SaveToast'
import { panBehavior, PanButton } from './behaviors/pan.tsx'
import { rotateYBehavior, RotateYButton } from './behaviors/rotateY.tsx'
import { makeZoomBehavior, ZoomControlsUI } from './behaviors/zoom.tsx'

const saved = loadCameraState()
const initialFov = saved?.fov ?? 50
const initialPosition = saved?.position ?? ([0, 1.5, 6] as [number, number, number])

export default function App() {
  const [fov, setFov] = useState(initialFov)
  const fovRef = useRef(fov)
  fovRef.current = fov

  const behaviors = useMemo(() => [
    panBehavior,
    rotateYBehavior,
    makeZoomBehavior(fovRef),
  ], [])

  return (
    <>
      <Canvas camera={{ position: initialPosition, fov: initialFov }} shadows>
        <Environment preset="apartment" />
        <Room />
        <OrbitControls makeDefault enableZoom={false} />
        <CameraController behaviors={behaviors} />
        <CameraStatePersist fov={fov} />
      </Canvas>
      <ZoomControlsUI fov={fov} onChange={setFov} />
      <PanButton />
      <RotateYButton />
      <SaveToast />
    </>
  )
}
