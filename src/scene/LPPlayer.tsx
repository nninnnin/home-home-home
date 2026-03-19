import { useRef } from 'react'
import { Mesh } from 'three'

export default function LPPlayer({ position }: { position: [number, number, number] }) {
  const discRef = useRef<Mesh>(null!)

  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Platter */}
      <mesh ref={discRef} position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.015, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Label */}
      <mesh position={[0, 0.258, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.016, 16]} />
        <meshStandardMaterial color="#c0392b" roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]} castShadow>
          <boxGeometry args={[0.03, 0.12, 0.03]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
    </group>
  )
}
