import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function RotatingKnot() {
  const meshRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.25
    meshRef.current.rotation.y += delta * 0.35
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.1, 0.34, 180, 24]} />
      <meshStandardMaterial color="#0d9488" roughness={0.3} metalness={0.4} />
    </mesh>
  )
}

function ParticleField() {
  const positions = useMemo(() => {
    const count = 40
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#38bdf8" size={0.04} sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export function HeroScene() {
  const webglAvailable = useMemo(() => hasWebGL(), [])

  if (!webglAvailable) {
    return (
      <div
        className="h-full w-full rounded-3xl bg-gradient-to-br from-brand-400 via-sky-accent to-brand-700"
        aria-hidden="true"
      />
    )
  }

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <RotatingKnot />
        <ParticleField />
      </Suspense>
    </Canvas>
  )
}
