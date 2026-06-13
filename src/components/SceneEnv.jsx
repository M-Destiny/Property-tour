import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const SKY_STOPS = {
  day:   [[0,'#0d1a50'],[0.4,'#1a3a70'],[0.65,'#3a6090'],[0.82,'#7aacd0'],[1,'#b8d4e8']],
  dusk:  [[0,'#160420'],[0.35,'#3a1025'],[0.6,'#7a2818'],[0.8,'#c84c14'],[1,'#f07830']],
  night: [[0,'#010204'],[0.4,'#030810'],[0.65,'#060c16'],[0.82,'#080e18'],[1,'#0c1420']],
}

const WIN_COLOR  = { day: new THREE.Color('#607080'), dusk: new THREE.Color('#ff8820'), night: new THREE.Color('#ffec70') }
const LIGHT_MULT = { day: 0.1, dusk: 0.7, night: 1.6 }

function makeSkyTexture(tod) {
  const c = document.createElement('canvas')
  c.width = 16; c.height = 256
  const g = c.getContext('2d')
  const grd = g.createLinearGradient(0, 0, 0, 256)
  SKY_STOPS[tod].forEach(([stop, color]) => grd.addColorStop(stop, color))
  g.fillStyle = grd; g.fillRect(0, 0, 16, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

const NEIGHBOURS = [
  [-46, -20, 18, 38, 16], [-50, 20, 16, 52, 18], [-40, 46, 22, 30, 16],
  [44, -26, 20, 46, 18],  [52, 18, 16, 64, 16],  [40, 48, 24, 34, 18],
  [0, -58, 40, 26, 18],   [-20, -50, 16, 40, 14], [20, -52, 16, 34, 14],
  [62, -4, 14, 28, 40],   [-64, 2, 14, 34, 40],
]

// Build window instanced mesh data once
function buildWindowData() {
  const positions = [], rotations = []
  NEIGHBOURS.forEach(([x, z, w, h, d]) => {
    const floorH = 3.2
    const floors = Math.max(2, Math.floor(h / floorH))
    const cols   = Math.max(2, Math.floor(w / 4))
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.55) continue
        const wx = x - w / 2 + (c + 0.5) * (w / cols)
        const wy = h / 2 - h + (f + 0.5) * floorH + 1.0
        positions.push([wx, wy, z + d / 2 + 0.05], [wx, wy, z - d / 2 - 0.05])
        rotations.push(0, Math.PI)
      }
    }
  })
  return { positions, rotations }
}

// Single instanced mesh for all building windows — one draw call instead of hundreds
const WIN_GEO = new THREE.PlaneGeometry(1.1, 0.9)
const _dummy  = new THREE.Object3D()

function BuildingWindows({ tod }) {
  const { positions, rotations } = useMemo(buildWindowData, [])
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: WIN_COLOR[tod].clone(), toneMapped: false, side: THREE.DoubleSide,
  }), [tod])

  if (!positions.length) return null
  return (
    <instancedMesh
      args={[WIN_GEO, mat, positions.length]}
      ref={(m) => {
        if (!m) return
        positions.forEach((p, i) => {
          _dummy.position.set(...p)
          _dummy.rotation.set(0, rotations[i], 0)
          _dummy.updateMatrix()
          m.setMatrixAt(i, _dummy.matrix)
        })
        m.instanceMatrix.needsUpdate = true
      }}
    />
  )
}

// Reduced to 2 key point lights (down from 6) — enough for atmosphere without shadow overhead
const KEY_LIGHTS = [
  { pos: [62, 42, -4],  color: '#ffecc0', intensity: 60, distance: 90 },
  { pos: [-64, 42, 2],  color: '#ffecc0', intensity: 60, distance: 90 },
]

function Tree({ position, scale }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 2.2, 6]} />
        <meshStandardMaterial color="#3a2c1f" roughness={1} />
      </mesh>
      <mesh position={[0, 3.4, 0]}>
        <coneGeometry args={[1.4, 3.4, 7]} />
        <meshStandardMaterial color="#1f3a2a" roughness={1} />
      </mesh>
    </group>
  )
}

export function SceneEnv({ tod = 'day' }) {
  const sky    = useMemo(() => makeSkyTexture(tod), [tod])
  const trees  = useMemo(() => Array.from({ length: 26 }).map(() => {
    const a = Math.random() * Math.PI * 2, r = 20 + Math.random() * 16
    return { pos: [Math.cos(a) * r, 0, Math.sin(a) * r], s: 0.8 + Math.random() * 0.5 }
  }), [])
  const palette = ['#161b23', '#13181f', '#1a2029']
  const lMult   = LIGHT_MULT[tod]

  return (
    <group>
      {/* Sky dome — lower poly, same visual */}
      <mesh>
        <sphereGeometry args={[900, 16, 8]} />
        <meshBasicMaterial map={sky} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1400, 1400]} />
        <meshStandardMaterial color="#12161d" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        {/* Reduced from 48 to 24 segments */}
        <circleGeometry args={[34, 24]} />
        <meshStandardMaterial color="#1b212b" roughness={0.9} />
      </mesh>

      {/* Roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -40]}>
        <planeGeometry args={[1400, 9]} />
        <meshStandardMaterial color="#0c0f14" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[44, 0.03, 0]}>
        <planeGeometry args={[1400, 9]} />
        <meshStandardMaterial color="#0c0f14" roughness={1} />
      </mesh>

      {/* Neighbour buildings — no castShadow (too far, huge shadow map cost) */}
      {NEIGHBOURS.map(([x, z, w, h, d], i) => (
        <mesh key={i} position={[x, h / 2, z]} receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={palette[i % 3]} roughness={0.6} metalness={0.3} />
        </mesh>
      ))}

      {/* All windows as ONE instanced draw call */}
      <BuildingWindows tod={tod} />

      {/* Only 2 key point lights instead of 6 */}
      {KEY_LIGHTS.map((bl, i) => (
        <pointLight key={i} position={bl.pos} color={bl.color}
          intensity={bl.intensity * lMult} distance={bl.distance} decay={2} />
      ))}

      {trees.map((t, i) => <Tree key={i} position={t.pos} scale={t.s} />)}
    </group>
  )
}
