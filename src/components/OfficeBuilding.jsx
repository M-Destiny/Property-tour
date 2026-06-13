import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCenteredGLTF } from './useCenteredGLTF.js'
import { FLOORS, FH, MODEL_HEIGHT, floorCenterY } from '../data/floors.js'

const STATE = {
  idle:     { color: '#6FA8C7', opacity: 0.0 },
  hovered:  { color: '#9fd0e6', opacity: 0.16 },
  selected: { color: '#E0BE7C', opacity: 0.22 },
  dimmed:   { color: '#6FA8C7', opacity: 0.0 },
}

function FloorBand({ index, y, w, d, state, onSelect, onHover }) {
  const mat = useRef()
  const target = STATE[state]
  useFrame((_, dt) => {
    const m = mat.current; if (!m) return
    const k = Math.min(1, dt * 9)
    m.color.lerp(new THREE.Color(target.color), k)
    m.opacity += (target.opacity - m.opacity) * k
  })
  return (
    <mesh
      position={[0, y, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect(index) }}
      onPointerOver={(e) => { e.stopPropagation(); onHover(index); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { onHover(null); document.body.style.cursor = 'auto' }}
    >
      <boxGeometry args={[w, FH * 0.96, d]} />
      <meshStandardMaterial ref={mat} color={target.color} emissive={target.color}
        emissiveIntensity={0.5} transparent opacity={target.opacity} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

// Real office GLB. Goes translucent (a "ghost silhouette") whenever a floor is
// active, so you can see the tower's shape around you while standing inside.
export function OfficeBuilding({ selected, hovered, onSelect, onHover }) {
  const { group, dims } = useCenteredGLTF('/models/office-building.glb', { targetHeight: MODEL_HEIGHT })
  const ghost = selected !== null
  const mats = useRef([])
  const lastGhost = useRef(null)

  useEffect(() => {
    const set = new Set()
    group.traverse((o) => {
      if (o.isMesh) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.side = THREE.DoubleSide; set.add(m) })
    })
    mats.current = [...set]
  }, [group])

  useFrame((_, dt) => {
    if (lastGhost.current !== ghost) {
      lastGhost.current = ghost
      mats.current.forEach((m) => { m.transparent = true; m.depthWrite = !ghost; m.needsUpdate = true })
    }
    const targetOp = ghost ? 0 : 1
    const k = Math.min(1, dt * 4)
    mats.current.forEach((m) => { m.opacity += (targetOp - m.opacity) * k })
  })

  const w = dims.width * 1.04
  const d = dims.depth * 1.04

  return (
    <group>
      <primitive object={group} />
      {!ghost && FLOORS.map((f, i) => (
        <FloorBand key={i} index={i} y={floorCenterY(i)} w={w} d={d}
          state={selected === i ? 'selected' : hovered === i ? 'hovered' : selected !== null ? 'dimmed' : 'idle'}
          onSelect={onSelect} onHover={onHover} />
      ))}
    </group>
  )
}
