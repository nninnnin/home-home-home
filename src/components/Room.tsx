import { useRef } from 'react'
import { Mesh } from 'three'

export default function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#c8b89a" roughness={0.8} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.5, -3]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#e8e0d4" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#ddd5c8" roughness={0.9} />
      </mesh>

      {/* Desk */}
      <Desk position={[-1.5, 0, -1.5]} />

      {/* LP Player */}
      <LPPlayer position={[1.2, 0, -1.5]} />

      {/* Frame */}
      <Frame position={[-2.9, 1.8, -0.5]} />

      {/* Window light */}
      <rectAreaLight
        position={[-2.8, 2.2, 0.5]}
        rotation={[0, Math.PI / 2, 0]}
        width={1.8}
        height={1.4}
        intensity={6}
        color="#fff5e0"
      />

      {/* Ambient */}
      <ambientLight intensity={0.4} />
    </group>
  )
}

function Desk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Top */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.06, 0.7]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.6} />
      </mesh>
      {/* Legs */}
      {[[-0.6, -0.3], [0.6, -0.3], [-0.6, 0.3], [0.6, 0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.36, z]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#4a2e1e" roughness={0.7} />
        </mesh>
      ))}
      {/* Notebook on desk */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <boxGeometry args={[0.4, 0.015, 0.3]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.5} />
      </mesh>
    </group>
  )
}

function LPPlayer({ position }: { position: [number, number, number] }) {
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

function Frame({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Frame border */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.9, 0.03]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.6} />
      </mesh>
      {/* Canvas inside */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.56, 0.76]} />
        <meshStandardMaterial color="#d4c5a9" roughness={0.9} />
      </mesh>
    </group>
  )
}
