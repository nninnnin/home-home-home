import { useState, useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Room from './scene/Room'
import { CameraController } from './tools/CameraController'
import { CameraStatePersist, loadCameraState } from './tools/CameraStatePersist'
import { SaveToast } from './tools/SaveToast'
import { panBehavior, PanButton } from './tools/behaviors/pan.tsx'
import { rotateYBehavior, RotateYButton } from './tools/behaviors/rotateY.tsx'
import { makeZoomBehavior, ZoomControlsUI } from './tools/behaviors/zoom.tsx'

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
