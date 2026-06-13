import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
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
    env:     'city',
    bg:      '#1a2030',
    fog:     '#1a2030',
    sun:     { pos: [80, 140, 70],   color: '#ffd9a8', intensity: 1.0  },
    fill:    { pos: [-70, 60, -50],  color: '#7fa6ff', intensity: 0.35 },
    hemi:    ['#dfe8ff', '#2a2118',  0.6],
    ambient: 0.15,
  },
  dusk: {
    env:     'sunset',
    bg:      '#180a06',
    fog:     '#180a06',
    sun:     { pos: [120, 35, 80],   color: '#ff6e1a', intensity: 0.8  },
    fill:    { pos: [-50, 40, -40],  color: '#9040d0', intensity: 0.22 },
    hemi:    ['#ff5520', '#1a0510',  0.38],
    ambient: 0.08,
  },
  night: {
    env:     'night',
    bg:      '#040608',
    fog:     '#040608',
    sun:     { pos: [-60, 90, -50],  color: '#6080c8', intensity: 0.18 },
    fill:    { pos: [40, 60, 30],    color: '#203068', intensity: 0.12 },
    hemi:    ['#0a1040', '#050808',  0.22],
    ambient: 0.06,
  },
}

export function Experience({ selected, hovered, setSelected, setHovered, onEnter, onExit,
  viewMode, activeSpot, spots, camRef, onSpotSelect, onSpotKey, tod = 'day' }) {

  const cfg      = TOD[tod] ?? TOD.day
  const inside   = selected !== null
  const floorY   = inside ? floorBottomY(selected) : 0

  return (
    <>
      <color attach="background" args={[cfg.bg]} />
      <fogExp2 attach="fog" args={[cfg.fog, 0.0035]} />

      <Environment preset={cfg.env} background={false} />

      <hemisphereLight args={cfg.hemi} />
      <directionalLight
        position={cfg.sun.pos} intensity={cfg.sun.intensity} color={cfg.sun.color} castShadow
        shadow-mapSize={[2048, 2048]} shadow-camera-left={-120} shadow-camera-right={120}
        shadow-camera-top={160} shadow-camera-bottom={-20} shadow-camera-far={500} shadow-bias={-0.0004}
      />
      <directionalLight position={cfg.fill.pos} intensity={cfg.fill.intensity} color={cfg.fill.color} />
      <ambientLight intensity={cfg.ambient} />

      <Suspense fallback={<ProceduralBuilding selected={selected} hovered={hovered} onSelect={setSelected} onHover={setHovered} />}>
        <OfficeBuilding selected={selected} hovered={hovered} onSelect={setSelected} onHover={setHovered} />
      </Suspense>

      {inside && (
        <>
          <Suspense fallback={null}>
            <FloorUnit floor={selected} />
          </Suspense>
          {/* Room enclosure: ceiling, walls, floor, interior lights */}
          <RoomShell floor={selected} tod={tod} />
        </>
      )}

      {/* 3-D hotspot pins — only in spots mode while standing inside */}
      {inside && viewMode === 'spots' && (
        <RoomHotspots
          spots={spots}
          floorY={floorY + 1.6}
          activeSpot={activeSpot}
          onSelect={onSpotSelect}
        />
      )}

      <SceneEnv tod={tod} />

      <TourController
        selected={selected} onEnter={onEnter} onExit={onExit}
        viewMode={viewMode} activeSpot={activeSpot} spots={spots}
        camRef={camRef} onSpotKey={onSpotKey}
      />
    </>
  )
}
