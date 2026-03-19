const STORAGE_KEY = 'hhh-camera'

export interface CameraState {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

export function loadCameraState(): CameraState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveCameraState(state: CameraState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  window.dispatchEvent(new Event('camera-saved'))
}
