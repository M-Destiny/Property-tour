/**
 * OPTIONAL: render the real Sketchfab models instead of (or alongside) the
 * procedural tower in Building.jsx.
 *
 * 1. Download the two models from Sketchfab as glTF/.glb (check each model's
 *    license — both must allow download/use):
 *      • Atlanta Corporate Office Building  ->  public/models/office-building.glb
 *      • Apartment Floor Plan               ->  public/models/apartment-plan.glb
 *
 * 2. Use <OfficeBuilding/> in Building.jsx in place of the procedural <group>,
 *    and keep the transparent <Floor/> pick boxes ON TOP so clicking still
 *    drives floor selection. Align FH / TOW_W / TOW_D in data/floors.js to the
 *    model's real storey height so the pick boxes line up with each level.
 *
 * 3. drei's useGLTF + Suspense handles async loading. Preload for snappier UX.
 */
import { useGLTF } from '@react-three/drei'

export function OfficeBuilding(props) {
  const { scene } = useGLTF('/models/office-building.glb')
  return <primitive object={scene} {...props} />
}

export function ApartmentPlan(props) {
  const { scene } = useGLTF('/models/apartment-plan.glb')
  return <primitive object={scene} {...props} />
}

// Preload so the swap-in feels instant:
// useGLTF.preload('/models/office-building.glb')
// useGLTF.preload('/models/apartment-plan.glb')
