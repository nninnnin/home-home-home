import { useThree, useFrame } from '@react-three/fiber'
import type { CameraBehavior } from '../lib/cameraBehavior'

interface Props {
  behaviors: CameraBehavior[]
}

export function CameraController({ behaviors }: Props) {
  const { camera, controls } = useThree()

  useFrame(() => {
    for (const behavior of behaviors) {
      behavior.onFrame({ camera, controls })
    }
  })

  return null
}
