import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Room from './components/Room'

export default function App() {
  return (
    <Canvas
      camera={{ position: [4, 3, 6], fov: 50 }}
      shadows
    >
      <Environment preset="apartment" />
      <Room />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={4}
        maxDistance={10}
      />
    </Canvas>
  )
}
