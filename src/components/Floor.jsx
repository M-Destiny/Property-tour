import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  FH, TOW_W, TOW_D, POD_W, POD_D, PODIUM_LEVELS,
} from '../data/floors.js'

const C = {
  idle:     { color: '#6FA8C7', emissive: '#6FA8C7', ei: 0.10, opacity: 0.34 },
  hovered:  { color: '#9fd0e6', emissive: '#9fd0e6', ei: 0.45, opacity: 0.50 },
  selected: { color: '#E0BE7C', emissive: '#E0BE7C', ei: 0.90, opacity: 0.55 },
  dimmed:   { color: '#6FA8C7', emissive: '#6FA8C7', ei: 0.04, opacity: 0.16 },
}

export function Floor({ index, y, state, onSelect, onHover }) {
  const mat = useRef()
  const target = C[state]
  const podium = index < PODIUM_LEVELS
  const w = podium ? POD_W : TOW_W
  const d = podium ? POD_D : TOW_D
  const cols = podium ? 8 : 6

  // smoothly tween material toward the target state each frame
  useFrame((_, dt) => {
    const m = mat.current
    if (!m) return
    const k = Math.min(1, dt * 8)
    m.color.lerp(new THREE.Color(target.color), k)
    m.emissive.lerp(new THREE.Color(target.emissive), k)
    m.emissiveIntensity += (target.ei - m.emissiveIntensity) * k
    m.opacity += (target.opacity - m.opacity) * k
  })

  return (
    <group position={[0, y, 0]}>
      {/* glass volume — the pick target */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelect(index) }}
        onPointerOver={(e) => { e.stopPropagation(); onHover(index); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { onHover(null); document.body.style.cursor = 'auto' }}
      >
        <boxGeometry args={[w - 0.6, FH - 0.5, d - 0.6]} />
        <meshStandardMaterial
          ref={mat}
          color={target.color}
          emissive={target.emissive}
          emissiveIntensity={target.ei}
          transparent
          opacity={target.opacity}
          roughness={0.08}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* spandrel band */}
      <mesh position={[0, FH / 2 - 0.05, 0]} castShadow>
        <boxGeometry args={[w, 0.55, d]} />
        <meshStandardMaterial color={podium ? '#2c333e' : '#3a4250'} roughness={0.7} metalness={0.35} />
      </mesh>

      {/* vertical mullions on both long faces */}
      {Array.from({ length: cols + 1 }).map((_, c) => {
        const x = -w / 2 + (c / cols) * w
        return (
          <group key={c}>
            <mesh position={[x, 0, d / 2 - 0.3]}>
              <boxGeometry args={[0.16, FH - 0.5, 0.16]} />
              <meshStandardMaterial color="#262d38" roughness={0.6} metalness={0.4} />
            </mesh>
            <mesh position={[x, 0, -(d / 2 - 0.3)]}>
              <boxGeometry args={[0.16, FH - 0.5, 0.16]} />
              <meshStandardMaterial color="#262d38" roughness={0.6} metalness={0.4} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
