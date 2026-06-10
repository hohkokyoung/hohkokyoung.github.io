import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SMALL_COUNT = 52
const HUB_COUNT = 8
const SPREAD = 3.2
const CONNECT_DIST = 1.55

// Seeded random so layout is stable across re-renders
function seededRandom(seed) {
  let s = seed
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646 }
}

function NetworkGraph() {
  const groupRef = useRef()
  const linesRef = useRef()
  const smallPointsRef = useRef()
  const hubPointsRef = useRef()

  const { smallPositions, hubPositions, linePositions, lineCount } = useMemo(() => {
    const rand = seededRandom(42)

    const allNodes = Array.from({ length: SMALL_COUNT + HUB_COUNT }, () =>
      new THREE.Vector3(
        (rand() - 0.5) * SPREAD * 2,
        (rand() - 0.5) * SPREAD * 2,
        (rand() - 0.5) * SPREAD * 2,
      )
    )

    const small = allNodes.slice(0, SMALL_COUNT)
    const hubs = allNodes.slice(SMALL_COUNT)

    const smallArr = new Float32Array(SMALL_COUNT * 3)
    small.forEach((n, i) => { smallArr[i*3] = n.x; smallArr[i*3+1] = n.y; smallArr[i*3+2] = n.z })

    const hubArr = new Float32Array(HUB_COUNT * 3)
    hubs.forEach((n, i) => { hubArr[i*3] = n.x; hubArr[i*3+1] = n.y; hubArr[i*3+2] = n.z })

    // Build connections between all nodes
    const lines = []
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        if (allNodes[i].distanceTo(allNodes[j]) < CONNECT_DIST) {
          lines.push(
            allNodes[i].x, allNodes[i].y, allNodes[i].z,
            allNodes[j].x, allNodes[j].y, allNodes[j].z,
          )
        }
      }
    }

    return {
      smallPositions: smallArr,
      hubPositions: hubArr,
      linePositions: new Float32Array(lines),
      lineCount: lines.length / 3,
    }
  }, [])

  useFrame((state) => {
    // Read scroll directly in the frame — no async pipeline, no lag
    const sp = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1)
    const t = state.clock.elapsedTime

    groupRef.current.rotation.y = t * 0.1 + sp * 1.5
    groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.12 + sp * 0.35

    if (linesRef.current) {
      linesRef.current.material.opacity = 0.14 + Math.sin(t * 0.6) * 0.04
    }
    if (hubPointsRef.current) {
      hubPointsRef.current.material.opacity = 0.6 + Math.sin(t * 0.9) * 0.15
    }

    state.camera.position.z = 10 - sp * 7.5
  })

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#d4a853" transparent opacity={0.15} />
      </lineSegments>

      {/* Regular nodes */}
      <points ref={smallPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[smallPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#d4a853" size={0.07} transparent opacity={0.55} sizeAttenuation />
      </points>

      {/* Hub nodes — larger, warm accent */}
      <points ref={hubPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#f0ebe2" size={0.18} transparent opacity={0.7} sizeAttenuation />
      </points>
    </group>
  )
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ background: '#111010', width: '100%', height: '100%' }}
      gl={{ alpha: false, antialias: true }}
    >
      <color attach="background" args={['#111010']} />
      <NetworkGraph />
    </Canvas>
  )
}
