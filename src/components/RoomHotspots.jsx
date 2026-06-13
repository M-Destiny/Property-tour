import { Html } from '@react-three/drei'

// occlude removed — per-frame raycasting against full scene was a major frame-rate killer.
// Pins are always visible; they're small enough that overlap is acceptable.
export function RoomHotspots({ spots, floorY, activeSpot, onSelect }) {
  if (!spots?.length) return null
  return (
    <>
      {spots.map((spot, i) => (
        <Html
          key={i}
          position={[spot.x, floorY + 2.1, spot.z]}
          center
          distanceFactor={9}
          zIndexRange={[10, 20]}
        >
          <button
            className={`hp ${i === activeSpot ? 'active' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span className="hp-n">{i + 1}</span>
            <span className="hp-label">{spot.label}</span>
          </button>
        </Html>
      ))}
    </>
  )
}
