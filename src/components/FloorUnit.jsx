import { useCenteredGLTF } from './useCenteredGLTF.js'
import { floorBottomY } from '../data/floors.js'

// The actual uploaded apartment, dropped onto the chosen storey.
export function FloorUnit({ floor }) {
  const { group } = useCenteredGLTF('/models/apartment.glb')
  return <primitive object={group} position={[0, floorBottomY(floor), 0]} />
}
