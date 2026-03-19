import Bird from './Bird'
import Desk from './Desk'
import LPPlayer from './LPPlayer'
import Frame from './Frame'

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

      <Desk position={[-1.5, 0, -1.5]} />
      <LPPlayer position={[1.2, 0, -1.5]} />
      <Frame position={[-2.9, 1.8, -0.5]} />
      <Bird position={[0, 0, 0]} />

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
