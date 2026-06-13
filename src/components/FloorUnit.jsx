import { useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { floorBottomY } from '../data/floors.js'

const IS_GLASS = /glass|window|glazing|glaz|balcon|curtain|facade|pane|transparent/i

const glassMat = new THREE.MeshStandardMaterial({
  color:           new THREE.Color('#c2ddf0'),
  metalness:       0.2,
  roughness:       0.03,
  transparent:     true,
  opacity:         0.12,
  envMapIntensity: 3.0,
  depthWrite:      false,
  side:            THREE.DoubleSide,
})

// Prepare the model once at module level — shared across all floor instances.
// useCenteredGLTF clones per-call which recreates groups and re-triggers useEffect.
// Instead we clone once here from the preloaded cache, apply materials immediately,
// and reuse the same group for every floor (just repositioned).
let preparedGroup = null

function getPreparedGroup(scene) {
  if (preparedGroup) return preparedGroup

  const box    = new THREE.Box3().setFromObject(scene)
  const center = new THREE.Vector3()
  box.getCenter(center)

  const root = scene.clone(true)
  root.position.set(-center.x, -box.min.y, -center.z)

  root.traverse((o) => {
    if (!o.isMesh) return
    o.castShadow    = true
    o.receiveShadow = true
    const mats = Array.isArray(o.material) ? o.material : [o.material]
    mats.forEach((m, idx) => {
      const tag = ((m.name || '') + ' ' + (o.name || '')).toLowerCase()
      if (IS_GLASS.test(tag)) {
        if (Array.isArray(o.material)) o.material[idx] = glassMat
        else o.material = glassMat
      } else {
        // Apply envMap boost once — not every render
        if (!m._envBoosted) {
          m.envMapIntensity = (m.envMapIntensity ?? 1) * 2.2
          m.needsUpdate     = true
          m._envBoosted     = true
        }
      }
    })
  })

  const group = new THREE.Group()
  group.add(root)
  preparedGroup = group
  return group
}

export function FloorUnit({ floor }) {
  const { scene } = useGLTF('/models/apartment.glb')
  const group     = useMemo(() => getPreparedGroup(scene), [scene])

  return <primitive object={group} position={[0, floorBottomY(floor), 0]} />
}
