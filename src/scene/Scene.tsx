import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Room from './Room'
import { CameraController } from '../tools/CameraController'
import { CameraStatePersist } from '../tools/CameraStatePersist'
import { panBehavior } from '../tools/behaviors/pan.tsx'
import { rotateYBehavior } from '../tools/behaviors/rotateY.tsx'
import { makeZoomBehavior } from '../tools/behaviors/zoom.tsx'
import { loadCameraState } from '../lib/cameraStorage'

const saved = loadCameraState()
const initialFov = saved?.fov ?? 50
const initialPosition = saved?.position ?? ([0, 1.5, 6] as [number, number, number])

interface Props {
  fov: number
}

export default function Scene({ fov }: Props) {
  const fovRef = useRef(fov)
  fovRef.current = fov

  const behaviors = useMemo(() => [
    panBehavior,
    rotateYBehavior,
    makeZoomBehavior(fovRef),
  ], [])

  return (
    <Canvas camera={{ position: initialPosition, fov: initialFov }} shadows>
      <Environment preset="apartment" />
      <Room />
      <OrbitControls makeDefault enableZoom={false} />
      <CameraController behaviors={behaviors} />
      <CameraStatePersist fov={fov} />
    </Canvas>
  )
}
