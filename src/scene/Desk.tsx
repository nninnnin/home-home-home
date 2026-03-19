export default function Desk({ position }: { position: [number, number, number] }) {
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
