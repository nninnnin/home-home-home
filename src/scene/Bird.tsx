export default function Bird({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Body — 통통하고 둥글게 */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="#4a7fb5" roughness={0.7} />
      </mesh>

      {/* Belly — 배 */}
      <mesh position={[0, 0.58, 0.28]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#c8dff0" roughness={0.6} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.22, 0.04]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#4a7fb5" roughness={0.7} />
      </mesh>

      {/* Cheek left */}
      <mesh position={[-0.15, 1.18, 0.2]} castShadow>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#e8a0a0" roughness={0.5} />
      </mesh>

      {/* Cheek right */}
      <mesh position={[0.15, 1.18, 0.2]} castShadow>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#e8a0a0" roughness={0.5} />
      </mesh>

      {/* Beak */}
      <mesh position={[0, 1.17, 0.32]} rotation={[0.3, 0, 0]} castShadow>
        <coneGeometry args={[0.07, 0.18, 6]} />
        <meshStandardMaterial color="#f0b840" roughness={0.4} />
      </mesh>

      {/* Eye left */}
      <mesh position={[-0.1, 1.28, 0.22]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Eye right */}
      <mesh position={[0.1, 1.28, 0.22]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Eye shine left */}
      <mesh position={[-0.085, 1.295, 0.258]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Eye shine right */}
      <mesh position={[0.115, 1.295, 0.258]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Wing left */}
      <mesh position={[-0.44, 0.74, 0]} rotation={[0, 0, 0.4]} castShadow>
        <sphereGeometry args={[0.22, 12, 10]} />
        <meshStandardMaterial color="#3a6a9a" roughness={0.7} />
      </mesh>
      {/* Wing right */}
      <mesh position={[0.44, 0.74, 0]} rotation={[0, 0, -0.4]} castShadow>
        <sphereGeometry args={[0.22, 12, 10]} />
        <meshStandardMaterial color="#3a6a9a" roughness={0.7} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 0.6, -0.42]} rotation={[-0.5, 0, 0]} castShadow>
        <coneGeometry args={[0.14, 0.36, 6]} />
        <meshStandardMaterial color="#3a6a9a" roughness={0.7} />
      </mesh>

      {/* Leg left */}
      <mesh position={[-0.1, 0.18, 0.04]} castShadow>
        <cylinderGeometry args={[0.035, 0.025, 0.36, 8]} />
        <meshStandardMaterial color="#f0b840" roughness={0.5} />
      </mesh>
      {/* Leg right */}
      <mesh position={[0.1, 0.18, 0.04]} castShadow>
        <cylinderGeometry args={[0.035, 0.025, 0.36, 8]} />
        <meshStandardMaterial color="#f0b840" roughness={0.5} />
      </mesh>

      {/* Foot left */}
      {[-0.1].map((lx) =>
        [[-0.06, 0.1], [0.06, 0.0], [0, -0.1]].map(([fx, fz], i) => (
          <mesh key={`l${i}`} position={[lx + fx, 0.02, 0.04 + fz]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.018, 0.012, 0.14, 6]} />
            <meshStandardMaterial color="#f0b840" roughness={0.5} />
          </mesh>
        ))
      )}
      {[0.1].map((rx) =>
        [[-0.06, 0.1], [0.06, 0.0], [0, -0.1]].map(([fx, fz], i) => (
          <mesh key={`r${i}`} position={[rx + fx, 0.02, 0.04 + fz]}>
            <cylinderGeometry args={[0.018, 0.012, 0.14, 6]} />
            <meshStandardMaterial color="#f0b840" roughness={0.5} />
          </mesh>
        ))
      )}
    </group>
  )
}
