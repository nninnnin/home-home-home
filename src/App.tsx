import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Room from './components/Room'

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 50 }}
      shadows
    >
      <Environment preset="apartment" />
      <Room />
    </Canvas>
  )
}
