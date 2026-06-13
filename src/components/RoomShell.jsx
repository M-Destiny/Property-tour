import * as THREE from 'three'
import { FH, floorBottomY } from '../data/floors.js'

const BX = 13.8, BZ = 4.5
const W = BX * 2, D = BZ * 2

// Wall material shared instances — avoid recreating per render
const WALL_MAT  = new THREE.MeshStandardMaterial({ color: '#e8e4dc', roughness: 0.88 })
const FLOOR_MAT = new THREE.MeshStandardMaterial({ color: '#c4b080', roughness: 0.72, metalness: 0.02 })
const CEIL_MAT  = new THREE.MeshStandardMaterial({ color: '#f0ede6', roughness: 0.95 })
const FIX_MAT   = new THREE.MeshStandardMaterial({ color: '#fffae8', emissive: new THREE.Color('#fffae8'), emissiveIntensity: 3.5, toneMapped: false })

// Shared geometry instances
const CEIL_GEO  = new THREE.BoxGeometry(W + 2, 0.3, D + 2)
const FLOOR_GEO = new THREE.PlaneGeometry(W + 2, D + 2)
const WALL_H_GEO = new THREE.PlaneGeometry(W + 2, 1)   // height set via scale
const WALL_D_GEO = new THREE.PlaneGeometry(D + 2, 1)
const FIX_GEO   = new THREE.BoxGeometry(0.38, 0.06, 1.8)

export function RoomShell({ floor, tod = 'day' }) {
  const y0    = floorBottomY(floor)
  const roomH = FH * 0.88
  const ceilY = y0 + roomH
  const li    = tod === 'night' ? 40 : tod === 'dusk' ? 32 : 22

  return (
    <group>
      {/* Ceiling box — solid, no clip-through */}
      <mesh geometry={CEIL_GEO} material={CEIL_MAT} position={[0, ceilY + 0.15, 0]} receiveShadow />

      {/* Ceiling light fixtures */}
      <mesh geometry={FIX_GEO} material={FIX_MAT} position={[-7, ceilY, 0]} />
      <mesh geometry={FIX_GEO} material={FIX_MAT} position={[ 0, ceilY, 0]} />
      <mesh geometry={FIX_GEO} material={FIX_MAT} position={[ 7, ceilY, 0]} />

      {/* Floor */}
      <mesh geometry={FLOOR_GEO} material={FLOOR_MAT}
        position={[0, y0 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow />

      {/* Walls — front-face only (camera always inside, no DoubleSide needed) */}
      {/* −X wall: plane default +Z normal → rotate Y+90° → faces +X (into room) */}
      <mesh material={WALL_MAT} position={[-BX, y0 + roomH / 2, 0]}
        rotation={[0, Math.PI / 2, 0]} scale={[1, roomH, 1]} receiveShadow>
        <planeGeometry args={[D + 2, 1]} />
      </mesh>
      {/* +X wall: rotate Y-90° → faces −X (into room) */}
      <mesh material={WALL_MAT} position={[BX, y0 + roomH / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]} scale={[1, roomH, 1]} receiveShadow>
        <planeGeometry args={[D + 2, 1]} />
      </mesh>
      {/* −Z wall: default faces +Z → into room */}
      <mesh material={WALL_MAT} position={[0, y0 + roomH / 2, -BZ]}
        scale={[1, roomH, 1]} receiveShadow>
        <planeGeometry args={[W + 2, 1]} />
      </mesh>
      {/* +Z wall: rotate Y180° → faces −Z (into room) */}
      <mesh material={WALL_MAT} position={[0, y0 + roomH / 2, BZ]}
        rotation={[0, Math.PI, 0]} scale={[1, roomH, 1]} receiveShadow>
        <planeGeometry args={[W + 2, 1]} />
      </mesh>

      {/* Interior lights — 3 ceiling fixtures + 1 daylight fill */}
      <pointLight position={[-7, ceilY - 0.5, 0]} color="#ffe8c8" intensity={li}       distance={18} decay={2} />
      <pointLight position={[ 0, ceilY - 0.5, 0]} color="#ffe8c8" intensity={li}       distance={18} decay={2} />
      <pointLight position={[ 7, ceilY - 0.5, 0]} color="#ffe8c8" intensity={li}       distance={18} decay={2} />
      <pointLight position={[BX - 1, y0 + roomH * 0.55, 0]} color="#cce4ff" intensity={li * 0.35} distance={22} decay={2} />
    </group>
  )
}
