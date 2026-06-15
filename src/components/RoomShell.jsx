import * as THREE from 'three'
import { floorBottomY } from '../data/floors.js'

// Sky sphere is hidden when inside so no dark gaps — no shell walls needed.
// This component provides only ceiling, floor, fixtures, and rich interior lights.

const CEIL_MAT  = new THREE.MeshStandardMaterial({ color: '#f5f2ec', roughness: 0.90, side: THREE.FrontSide })
const FLOOR_MAT = new THREE.MeshStandardMaterial({ color: '#b8a46e', roughness: 0.55, metalness: 0.04 })
const WALL_MAT  = new THREE.MeshStandardMaterial({ color: '#f0ece4', roughness: 0.85, side: THREE.DoubleSide })
const FIX_MAT   = new THREE.MeshStandardMaterial({
  color: '#fff8e8', emissive: new THREE.Color('#fff6d0'),
  emissiveIntensity: 4.5, toneMapped: false,
})
const FIX_GEO = new THREE.BoxGeometry(0.28, 0.04, 1.8)

// Realistic interior lighting — warm ceiling, cool window fill, soft bounce
// No pure white: every light has a colour temperature
const LI = {
  day: {
    ceil:   { color: '#ffd080', intensity:  8, dist: 10 },   // warm amber downlight
    sky:    { color: '#aed4f5', intensity: 10, dist: 30 },   // soft blue daylight from windows
    bounce: { color: '#f5c97a', intensity:  5, dist: 18 },   // golden bounce off back wall
    fill:   { color: '#ffe4a0', intensity:  3, dist: 12 },   // very soft floor fill
  },
  dusk: {
    ceil:   { color: '#ff9a30', intensity: 12, dist: 10 },
    sky:    { color: '#ff5510', intensity:  6, dist: 30 },
    bounce: { color: '#ff7020', intensity:  7, dist: 18 },
    fill:   { color: '#ff8840', intensity:  4, dist: 12 },
  },
  night: {
    ceil:   { color: '#ffb830', intensity: 16, dist: 10 },
    sky:    { color: '#2a3d70', intensity:  4, dist: 30 },
    bounce: { color: '#ff7010', intensity:  9, dist: 18 },
    fill:   { color: '#ffaa40', intensity:  5, dist: 12 },
  },
}

export function RoomShell({ floor, tod = 'day', aptDims }) {
  const y0    = floorBottomY(floor)
  const li    = LI[tod] ?? LI.day
  const roomH = aptDims?.h ?? 2.946
  const halfW = aptDims ? aptDims.w / 2 : 22.275
  const halfD = aptDims ? aptDims.d / 2 :  5.611
  const ceilY = y0 + roomH
  const fx    = halfW * 0.35

  return (
    <group>
      {/* Ceiling — flat plane only, no sides that could appear as walls */}
      <mesh position={[0, ceilY + 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[halfW * 2 + 0.3, halfD * 2 + 0.3]} />
        <primitive object={CEIL_MAT} attach="material" />
      </mesh>

      {/* Ceiling light strip fixtures */}
      {[-fx, 0, fx].map((x) => (
        <mesh key={x} geometry={FIX_GEO} material={FIX_MAT} position={[x, ceilY - 0.01, 0]} />
      ))}

      {/* Floor */}
      <mesh position={[0, y0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[halfW * 2 + 0.3, halfD * 2 + 0.3]} />
        <primitive object={FLOOR_MAT} attach="material" />
      </mesh>

      {/* Back wall +X — rotate Y 90° so plane stands in the YZ plane */}
      <mesh position={[halfW, y0 + roomH / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[halfD * 2, roomH]} />
        <primitive object={WALL_MAT} attach="material" />
      </mesh>

      {/* Side wall +Z */}
      <mesh position={[0, y0 + roomH / 2, halfD]}>
        <planeGeometry args={[halfW * 2, roomH]} />
        <primitive object={WALL_MAT} attach="material" />
      </mesh>

      {/* Side wall -Z */}
      <mesh position={[0, y0 + roomH / 2, -halfD]}>
        <planeGeometry args={[halfW * 2, roomH]} />
        <primitive object={WALL_MAT} attach="material" />
      </mesh>

      {/* ── Ceiling downlights (3 warm cones across width) ── */}
      {[-fx, 0, fx].map((x) => (
        <pointLight key={x}
          position={[x, ceilY - 0.45, 0]}
          color={li.ceil.color} intensity={li.ceil.intensity}
          distance={li.ceil.dist} decay={2}
        />
      ))}

      {/* ── Daylight / sky fill from the glass facade (−X side per GLB) ── */}
      <pointLight position={[-halfW * 0.5, y0 + roomH * 0.75,  1.5]}
        color={li.sky.color} intensity={li.sky.intensity} distance={li.sky.dist} decay={1.4} />
      <pointLight position={[-halfW * 0.5, y0 + roomH * 0.40, -1.5]}
        color={li.sky.color} intensity={li.sky.intensity * 0.55} distance={li.sky.dist * 0.7} decay={1.4} />

      {/* ── Warm bounce light from solid wall side (+X) ── */}
      <pointLight position={[halfW * 0.5, y0 + roomH * 0.55, 0]}
        color={li.bounce.color} intensity={li.bounce.intensity} distance={li.bounce.dist} decay={2} />

      {/* ── Low floor fill — softens harsh ceiling shadows on lower surfaces ── */}
      <pointLight position={[0, y0 + 0.6, 0]}
        color={li.fill.color} intensity={li.fill.intensity} distance={li.fill.dist} decay={2} />
    </group>
  )
}
