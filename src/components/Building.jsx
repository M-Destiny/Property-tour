import { useMemo } from 'react'
import { Edges } from '@react-three/drei'
import { Floor } from './Floor.jsx'
import {
  FLOORS, FH, TOW_W, TOW_D, BASE_Y, N, floorCenterY,
} from '../data/floors.js'

export function Building({ selected, hovered, onSelect, onHover }) {
  const totalH = N * FH
  const pillars = useMemo(
    () => [[-1, -1], [1, -1], [-1, 1], [1, 1]], []
  )

  return (
    <group>
      {/* plinth */}
      <mesh position={[0, BASE_Y / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[34, BASE_Y, 26]} />
        <meshStandardMaterial color="#222a35" roughness={0.9} />
      </mesh>

      {/* dark core for depth behind glass */}
      <mesh position={[0, BASE_Y + totalH / 2, 0]}>
        <boxGeometry args={[TOW_W * 0.5, totalH, TOW_D * 0.5]} />
        <meshStandardMaterial color="#171c24" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* floors */}
      {FLOORS.map((f, i) => (
        <Floor
          key={i}
          index={i}
          y={floorCenterY(i)}
          state={selected === i ? 'selected' : hovered === i ? 'hovered' : selected !== null ? 'dimmed' : 'idle'}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}

      {/* corner pillars */}
      {pillars.map(([sx, sz], k) => (
        <mesh key={k} position={[sx * (TOW_W / 2 - 0.2), BASE_Y + totalH / 2, sz * (TOW_D / 2 - 0.2)]} castShadow>
          <boxGeometry args={[0.7, totalH, 0.7]} />
          <meshStandardMaterial color="#2b323d" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}

      {/* crown */}
      <mesh position={[0, BASE_Y + totalH + 0.6, 0]} castShadow>
        <boxGeometry args={[TOW_W + 0.6, 1.2, TOW_D + 0.6]} />
        <meshStandardMaterial color="#2b323d" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, BASE_Y + totalH + 2.4, 0]} castShadow>
        <boxGeometry args={[TOW_W * 0.7, 2.4, TOW_D * 0.7]} />
        <meshStandardMaterial color="#1d232c" roughness={0.7} metalness={0.2} />
        <Edges color="#3a4350" />
      </mesh>
      <mesh position={[0, BASE_Y + totalH + 4, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#000" emissive="#E0BE7C" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}
