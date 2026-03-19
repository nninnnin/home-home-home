export default function Frame({ position }: { position: [number, number, number] }) {
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
