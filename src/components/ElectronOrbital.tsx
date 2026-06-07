import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Torus, Float, Html } from '@react-three/drei'
import * as THREE from 'three'

interface ElectronOrbitalProps {
  shells: number[]
}

function Nucleus({ protonCount }: { protonCount: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[0.55, 48, 48]}>
          <meshStandardMaterial
            color="#ff8c00"
            emissive="#ff4500"
            emissiveIntensity={1.5}
            roughness={0.3}
            metalness={0.6}
          />
        </Sphere>
      </Float>
      <pointLight color="#ff6600" intensity={2.5} distance={5} decay={2} />
      <pointLight color="#ffaa00" intensity={1.5} distance={3} decay={2} position={[0.5, 0.3, 0.5]} />
      <Html center distanceFactor={6} position={[0, 0, 0.6]} style={{ pointerEvents: 'none' }}>
        <div className="text-white font-bold text-xs bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
          {protonCount}p⁺
        </div>
      </Html>
    </group>
  )
}

function ElectronOrbit({
  radius,
  tiltX,
  tiltZ,
  electronCount,
  color,
  orbitIndex,
}: {
  radius: number
  tiltX: number
  tiltZ: number
  electronCount: number
  color: string
  orbitIndex: number
}) {
  const torusRef = useRef<THREE.Mesh>(null)
  const electronsRef = useRef<THREE.Group>(null)
  const speed = useMemo(() => 0.4 + (orbitIndex % 3) * 0.15 + Math.random() * 0.1, [orbitIndex])
  const direction = orbitIndex % 2 === 0 ? 1 : -1

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = tiltX
      torusRef.current.rotation.z = tiltZ
    }
    if (electronsRef.current) {
      electronsRef.current.rotation.x = tiltX
      electronsRef.current.rotation.z = tiltZ
      electronsRef.current.rotation.y += direction * speed * 0.02
    }
  })

  const electrons = useMemo(() => {
    return Array.from({ length: electronCount }).map((_, i) => {
      const angle = (i / electronCount) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      return { x, z, i }
    })
  }, [electronCount, radius])

  return (
    <group>
      <Torus ref={torusRef} args={[radius, 0.015, 16, 128]}>
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </Torus>
      <group ref={electronsRef}>
        {electrons.map(({ x, z, i }) => (
          <group key={i} position={[x, 0, z]}>
            <Sphere args={[0.11, 24, 24]}>
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
            <pointLight color={color} intensity={0.8} distance={1.5} decay={2} />
          </group>
        ))}
      </group>
    </group>
  )
}

function AtomScene({ shells }: { shells: number[] }) {
  const protonCount = shells.reduce((sum, count) => sum + count, 0)

  const orbits = useMemo(() => {
    const colors = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fb923c', '#fbbf24']
    return shells.map((count, i) => {
      const radius = 1.2 + i * 0.7
      const tiltX = (i * 0.4 + (i % 2 === 0 ? 0.3 : -0.2)) % (Math.PI / 2)
      const tiltZ = (i * 0.25 + (i % 3) * 0.15) % Math.PI
      return {
        radius,
        tiltX,
        tiltZ,
        electronCount: count,
        color: colors[i % colors.length],
        orbitIndex: i,
      }
    })
  }, [shells])

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-5, -3, -5]} intensity={0.2} color="#6688ff" />

      <Nucleus protonCount={protonCount} />

      {orbits.map((orbit, i) => (
        <ElectronOrbit key={i} {...orbit} />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={12}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

export default function ElectronOrbital({ shells }: ElectronOrbitalProps) {
  return (
    <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-space-800/50 to-space-950/50">
      <Canvas
        camera={{ position: [0, 3, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <AtomScene shells={shells} />
      </Canvas>
    </div>
  )
}
