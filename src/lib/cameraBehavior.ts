import type { Camera } from 'three'

export interface BehaviorContext {
  camera: Camera
  // OrbitControls instance (drei)
  controls: any
}

export interface CameraBehavior {
  id: string
  onFrame: (ctx: BehaviorContext) => void
}
