import { Suspense, useMemo } from 'react'
import { Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { OfficeBuilding } from './OfficeBuilding.jsx'
import { Building as ProceduralBuilding } from './Building.jsx'
import { FloorUnit } from './FloorUnit.jsx'
import { SceneEnv } from './SceneEnv.jsx'
import { TourController } from './TourController.jsx'
import { RoomHotspots } from './RoomHotspots.jsx'
import { RoomShell } from './RoomShell.jsx'
import { floorBottomY } from '../data/floors.js'

const TOD = {
  day: {
    env:    'city',
    bg:     '#1a2030',
    fog:    '#1a2030',
    sun:    { pos: [80, 140, 70],  color: '#ffd9a8', intensity: 2.2,  intensityIn: 0.0 },
    fill:   { pos: [-70, 60, -50], color: '#7fa6ff', intensity: 0.6,  intensityIn: 0.0 },
    hemi:   { sky: '#dfe8ff', gnd: '#2a2118', out: 0.9, inn: 0.0 },
    ambient:{ out: 0.3,  inn: 0.0 },
    envInt: { out: 1.2,  inn: 0.35 },   // low inside — room point lights carry the look
  },
  dusk: {
    env:    'sunset',
    bg:     '#180a06',
    fog:    '#180a06',
    sun:    { pos: [120, 35, 80],  color: '#ff6e1a', intensity: 1.6,  intensityIn: 0.0 },
    fill:   { pos: [-50, 40, -40], color: '#9040d0', intensity: 0.4,  intensityIn: 0.0 },
    hemi:   { sky: '#ff5520', gnd: '#1a0510', out: 0.55, inn: 0.0 },
    ambient:{ out: 0.15, inn: 0.0 },
    envInt: { out: 1.0,  inn: 0.30 },
  },
  night: {
    env:    'night',
    bg:     '#040608',
    fog:    '#040608',
    sun:    { pos: [-60, 90, -50], color: '#6080c8', intensity: 0.35, intensityIn: 0.0 },
    fill:   { pos: [40, 60, 30],   color: '#203068', intensity: 0.2,  intensityIn: 0.0 },
    hemi:   { sky: '#0a1040', gnd: '#050808', out: 0.35, inn: 0.0 },
    ambient:{ out: 0.1,  inn: 0.0 },
    envInt: { out: 0.8,  inn: 0.25 },
  },
}

function useAptDims() {
  const { scene } = useGLTF('/models/apartment.glb')
  return useMemo(() => {
    const box  = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)
    return { w: size.x, h: size.y, d: size.z }
  }, [scene])
}

export function Experience({ selected, hovered, setSelected, setHovered, onEnter, onExit,
  viewMode, activeSpot, spots, camRef, onSpotSelect, onSpotKey, tod = 'day' }) {

  const cfg     = TOD[tod] ?? TOD.day
  const inside  = selected !== null
  const floorY  = inside ? floorBottomY(selected) : 0
  const aptDims = useAptDims()

  // Pick scalar values based on inside/outside
  const sunInt    = inside ? cfg.sun.intensityIn   : cfg.sun.intensity
  const fillInt   = inside ? cfg.fill.intensityIn  : cfg.fill.intensity
  const hemiInt   = inside ? cfg.hemi.inn          : cfg.hemi.out
  const ambInt    = inside ? cfg.ambient.inn       : cfg.ambient.out
  const envInt    = inside ? cfg.envInt.inn        : cfg.envInt.out

  return (
    <>
      <color attach="background" args={[inside ? '#e8e3d8' : cfg.bg]} />
      {/* Fog only outside — inside has no fog so city view through windows stays clear */}
      {!inside && <fogExp2 attach="fog" args={[cfg.fog, 0.0035]} />}

      {/* Single environment — never swap preset (swapping recompiles all shaders = stutter).
          Only the intensity changes between inside/outside. */}
      <Environment preset={cfg.env} background={false} environmentIntensity={envInt} />

      {/* Exterior lights — zeroed out when inside so only room lights illuminate */}
      <hemisphereLight color={cfg.hemi.sky} groundColor={cfg.hemi.gnd} intensity={hemiInt} />
      <directionalLight
        position={cfg.sun.pos} intensity={sunInt} color={cfg.sun.color} castShadow
        shadow-mapSize={[2048, 2048]} shadow-camera-left={-120} shadow-camera-right={120}
        shadow-camera-top={160} shadow-camera-bottom={-20} shadow-camera-far={500}
        shadow-bias={-0.0004}
      />
      <directionalLight position={cfg.fill.pos} intensity={fillInt} color={cfg.fill.color} />
      <ambientLight intensity={ambInt} />

      <Suspense fallback={<ProceduralBuilding selected={selected} hovered={hovered} onSelect={setSelected} onHover={setHovered} />}>
        <OfficeBuilding selected={selected} hovered={hovered} onSelect={setSelected} onHover={setHovered} />
      </Suspense>

      {inside && (
        <>
          <Suspense fallback={null}>
            <FloorUnit floor={selected} />
          </Suspense>
          <RoomShell floor={selected} tod={tod} aptDims={aptDims} />
        </>
      )}

      {inside && viewMode === 'spots' && (
        <RoomHotspots
          spots={spots}
          floorY={floorY + 1.6}
          activeSpot={activeSpot}
          onSelect={onSpotSelect}
        />
      )}

      <SceneEnv tod={tod} inside={inside} />

      <TourController
        selected={selected} onEnter={onEnter} onExit={onExit}
        viewMode={viewMode} activeSpot={activeSpot} spots={spots}
        camRef={camRef} onSpotKey={onSpotKey}
      />
    </>
  )
}
