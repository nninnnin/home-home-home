import { useState } from 'react'
import { loadCameraState } from './lib/cameraStorage'
import Scene from './scene/Scene'
import ToolsUI from './tools/ToolsUI'

const initialFov = loadCameraState()?.fov ?? 50

export default function App() {
  const [fov, setFov] = useState(initialFov)

  return (
    <>
      <Scene fov={fov} />
      <ToolsUI fov={fov} onFovChange={setFov} />
    </>
  )
}
