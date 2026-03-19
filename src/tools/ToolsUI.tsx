import { ZoomControlsUI } from './behaviors/zoom.tsx'
import { PanButton } from './behaviors/pan.tsx'
import { RotateYButton } from './behaviors/rotateY.tsx'
import { SaveToast } from './SaveToast'

interface Props {
  fov: number
  onFovChange: (fov: number) => void
}

export default function ToolsUI({ fov, onFovChange }: Props) {
  return (
    <>
      <ZoomControlsUI fov={fov} onChange={onFovChange} />
      <PanButton />
      <RotateYButton />
      <SaveToast />
    </>
  )
}
