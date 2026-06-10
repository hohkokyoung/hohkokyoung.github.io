import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function KeyTile({ position, rotation, scale = 1, color = '#1b1c1e', speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.3 * speed) * 0.18
    ref.current.rotation.x = rotation[0] + Math.cos(t * 0.25 * speed) * 0.12
  })

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} rotation={rotation} scale={scale} castShadow>
        <boxGeometry args={[1.2, 1.2, 0.28]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>
    </Float>
  )
}

function Crystal({ position }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = t * 0.15
    ref.current.rotation.y = t * 0.2
  })
  return (
    <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[1.05, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.6}
          roughness={0.1}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.04}
          color="#56c2ff"
          attenuationColor="#7e57c2"
          attenuationDistance={2}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const ref = useRef()
  const count = 180
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.025
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#9c9c9d" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function HeroScene({ reduced = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, reduced ? 8 : 7], fov: 50 }}
      dpr={reduced ? [1, 1.25] : [1, 1.5]}
      gl={{ antialias: !reduced, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#040506']} />
      <fog attach="fog" args={['#040506', 8, 18]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-4, 2, 2]} intensity={1.5} color="#56c2ff" />
      <pointLight position={[4, -2, 2]} intensity={1.5} color="#ff6363" />

      <ParticleField />

      <Crystal position={[0, 0, 0]} />

      <KeyTile position={[-3.2, 1.4, -1]} rotation={[0.3, -0.4, 0.1]} color="#111214" speed={1.1} />
      <KeyTile position={[3.0, 1.0, -1.5]} rotation={[-0.2, 0.4, 0.2]} color="#1b1c1e" speed={0.8} />
      <KeyTile position={[-2.8, -1.6, -0.5]} rotation={[0.4, 0.3, -0.1]} color="#1b1c1e" speed={1.3} />
      <KeyTile position={[2.6, -1.7, -1]} rotation={[-0.3, -0.5, 0.05]} color="#111214" speed={0.9} />
      <KeyTile position={[-4.5, 0.2, -2.5]} rotation={[0.2, 0.6, 0.3]} scale={0.7} color="#0d0e10" speed={0.7} />
      <KeyTile position={[4.4, -0.3, -2.5]} rotation={[-0.5, -0.3, -0.2]} scale={0.7} color="#0d0e10" speed={1.4} />

      <Environment preset="city" />
    </Canvas>
  )
}
