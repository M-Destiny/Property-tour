import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Loads a GLB, clones it (so the cache isn't mutated), recenters it on X/Z,
// drops its base to y=0, and optionally scales it to a target world height.
// Returns the prepared group plus its final {width, depth, height}.
export function useCenteredGLTF(url, { targetHeight = null, shadows = true } = {}) {
  const { scene } = useGLTF(url)
  return useMemo(() => {
    const root = scene.clone(true)

    // measure raw bounds
    let box = new THREE.Box3().setFromObject(root)
    const size = new THREE.Vector3(); box.getSize(size)
    const center = new THREE.Vector3(); box.getCenter(center)

    // center on XZ, base to y=0 (pre-scale)
    root.position.set(-center.x, -box.min.y, -center.z)

    if (shadows) {
      root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    }

    const group = new THREE.Group()
    group.add(root)
    const scale = targetHeight ? targetHeight / size.y : 1
    group.scale.setScalar(scale)

    return {
      group,
      dims: { width: size.x * scale, depth: size.z * scale, height: size.y * scale },
    }
  }, [scene, targetHeight, shadows])
}

useGLTF.preload('/models/office-building.glb')
useGLTF.preload('/models/apartment.glb')
