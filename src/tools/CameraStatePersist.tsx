import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { loadCameraState, saveCameraState } from '../lib/cameraStorage'

export { loadCameraState } from '../lib/cameraStorage'

interface Props {
  fov: number
}

export function CameraStatePersist({ fov }: Props) {
  const { camera, controls } = useThree()
  const restored = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const save = () => {
    // @ts-ignore
    const target: Vector3 = controls?.target ?? new Vector3()
    saveCameraState({
      position: camera.position.toArray() as [number, number, number],
      target: target.toArray() as [number, number, number],
      fov: 'fov' in camera ? (camera as any).fov : 50,
    })
  }

  const debouncedSave = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(save, 1000)
  }

  useEffect(() => {
    window.addEventListener('pointermove', debouncedSave)
    window.addEventListener('pointerup', debouncedSave)
    return () => {
      window.removeEventListener('pointermove', debouncedSave)
      window.removeEventListener('pointerup', debouncedSave)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [camera, controls])

  useEffect(() => {
    debouncedSave()
  }, [fov])

  // Restore: wait until controls is ready (target exists)
  useFrame(() => {
    if (restored.current) return
    // @ts-ignore
    if (!controls?.target) return

    const saved = loadCameraState()
    if (saved) {
      camera.position.set(...saved.position)
      // @ts-ignore
      controls.target.set(...saved.target)
      // @ts-ignore
      controls.update?.()
      if ('fov' in camera) {
        ;(camera as any).fov = saved.fov
        camera.updateProjectionMatrix()
      }
    }
    restored.current = true
  })

  return null
}
