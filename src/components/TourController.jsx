import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BASE_Y, FH, N, floorBottomY } from '../data/floors.js'
import { moveState } from './tourInput.js'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const tmp = new THREE.Object3D()
tmp.rotation.order = 'YXZ'

const BOUND_X = 13.5, BOUND_Z = 4.2

export function TourController({ selected, onEnter, onExit, viewMode, activeSpot, spots, camRef, onSpotKey }) {
  const { camera, gl } = useThree()
  const phase       = useRef('orbit')
  const orbit       = useRef({ target: new THREE.Vector3(0, BASE_Y + N * FH * 0.5, 0), radius: 165, theta: 0.5, phi: 1.0 })
  const look        = useRef({ yaw: -Math.PI / 2, pitch: -0.02 })
  const standY      = useRef(BASE_Y + 1.6)
  const tween       = useRef(null)
  const spotTween   = useRef(null)
  const dragging    = useRef(false)
  const last        = useRef({ x: 0, y: 0 })
  const keys        = useRef({})
  const first       = useRef(true)

  // Mirror props into refs so event handlers / useFrame always see latest values
  const viewModeRef  = useRef(viewMode)
  const spotsRef     = useRef(spots)
  const activeSpotRef= useRef(activeSpot)
  const onSpotKeyRef = useRef(onSpotKey)
  useEffect(() => { viewModeRef.current  = viewMode  }, [viewMode])
  useEffect(() => { spotsRef.current     = spots     }, [spots])
  useEffect(() => { activeSpotRef.current= activeSpot}, [activeSpot])
  useEffect(() => { onSpotKeyRef.current = onSpotKey }, [onSpotKey])

  const applyOrbit = () => {
    const o = orbit.current
    camera.position.set(
      o.target.x + o.radius * Math.sin(o.phi) * Math.sin(o.theta),
      o.target.y + o.radius * Math.cos(o.phi),
      o.target.z + o.radius * Math.sin(o.phi) * Math.cos(o.theta)
    )
    camera.lookAt(o.target)
  }

  const orbitPose = () => {
    const o = orbit.current
    tmp.position.set(
      o.target.x + o.radius * Math.sin(o.phi) * Math.sin(o.theta),
      o.target.y + o.radius * Math.cos(o.phi),
      o.target.z + o.radius * Math.sin(o.phi) * Math.cos(o.theta)
    )
    tmp.lookAt(o.target); tmp.updateMatrixWorld()
    return { pos: tmp.position.clone(), quat: tmp.quaternion.clone() }
  }

  const interiorPose = (floor) => {
    const fY = floorBottomY(floor)
    standY.current = fY + 1.6
    // Face +X into the room from the left-side entry (yaw = -π/2 → look direction = +X)
    look.current.yaw   = -Math.PI / 2
    look.current.pitch = -0.02
    const pos = new THREE.Vector3(-BOUND_X * 0.85, fY + 1.6, 0)
    tmp.position.copy(pos)
    tmp.rotation.set(look.current.pitch, look.current.yaw, 0)
    tmp.updateMatrixWorld()
    return { pos, quat: tmp.quaternion.clone() }
  }

  const teleportToSpot = (spot) => {
    if (!spot) return
    const fromP = camera.position.clone()
    const fromYaw = look.current.yaw
    const toP = new THREE.Vector3(
      clamp(spot.x, -BOUND_X, BOUND_X),
      standY.current,
      clamp(spot.z, -BOUND_Z, BOUND_Z)
    )
    let dy = spot.yaw - fromYaw
    if (dy >  Math.PI) dy -= Math.PI * 2
    if (dy < -Math.PI) dy += Math.PI * 2
    spotTween.current = { fromP, toP, fromYaw, deltaYaw: dy, t: 0, dur: 0.65 }
  }

  useEffect(() => { applyOrbit() }, []) // eslint-disable-line

  // Floor selection → camera transition
  useEffect(() => {
    if (first.current) { first.current = false; if (selected == null) return }
    if (selected != null) {
      const { pos, quat } = interiorPose(selected)
      tween.current = { fromP: camera.position.clone(), toP: pos, fromQ: camera.quaternion.clone(), toQ: quat, t: 0, dur: 1.5, to: 'interior' }
      phase.current = 'toInterior'
    } else {
      const { pos, quat } = orbitPose()
      tween.current = { fromP: camera.position.clone(), toP: pos, fromQ: camera.quaternion.clone(), toQ: quat, t: 0, dur: 1.2, to: 'exterior' }
      phase.current = 'toExterior'
    }
  }, [selected]) // eslint-disable-line

  // Spot selection → smooth teleport when already inside
  useEffect(() => {
    if (phase.current !== 'interior') return
    if (viewMode !== 'spots' || !spots?.length) return
    teleportToSpot(spots[activeSpot])
  }, [activeSpot, viewMode]) // eslint-disable-line

  // Input
  useEffect(() => {
    const el = gl.domElement
    const down = (e) => { dragging.current = true; last.current = { x: e.clientX, y: e.clientY } }
    const move = (e) => {
      if (!dragging.current) return
      const dx = e.clientX - last.current.x, dy = e.clientY - last.current.y
      last.current = { x: e.clientX, y: e.clientY }
      if (phase.current === 'orbit') {
        orbit.current.theta -= dx * 0.005
        orbit.current.phi = clamp(orbit.current.phi - dy * 0.005, 0.12, 1.45)
        applyOrbit()
      } else if (phase.current === 'interior') {
        look.current.yaw  -= dx * 0.0042
        // Clamp pitch: max 0.78 rad up (~45°) keeps camera below ceiling; -0.9 down stops floor clip
        look.current.pitch = clamp(look.current.pitch - dy * 0.0042, -0.9, 0.78)
      }
    }
    const up = () => { dragging.current = false }
    const wheel = (e) => {
      e.preventDefault()
      if (phase.current === 'orbit') {
        orbit.current.radius = clamp(orbit.current.radius * (1 + e.deltaY * 0.001), 45, 400)
        applyOrbit()
      }
    }
    const kd = (e) => {
      // Keyboard shortcuts while inside in spots mode
      if (phase.current === 'interior' && viewModeRef.current === 'spots') {
        const digit = parseInt(e.key)
        if (digit >= 1 && digit <= 5) {
          e.preventDefault()
          onSpotKeyRef.current?.(digit - 1)
          return
        }
        if (e.code === 'ArrowLeft')  { e.preventDefault(); onSpotKeyRef.current?.('prev'); return }
        if (e.code === 'ArrowRight') { e.preventDefault(); onSpotKeyRef.current?.('next'); return }
      }
      keys.current[e.code] = true
    }
    const ku = (e) => { keys.current[e.code] = false }

    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    el.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('keydown', kd)
    window.addEventListener('keyup', ku)
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      el.removeEventListener('wheel', wheel)
      window.removeEventListener('keydown', kd)
      window.removeEventListener('keyup', ku)
    }
  }, [gl]) // eslint-disable-line

  useFrame((_, dt) => {
    const ph = phase.current

    if (ph === 'toInterior' || ph === 'toExterior') {
      const tw = tween.current; if (!tw) return
      tw.t = Math.min(1, tw.t + dt / tw.dur)
      const k = ease(tw.t)
      camera.position.lerpVectors(tw.fromP, tw.toP, k)
      camera.quaternion.slerpQuaternions(tw.fromQ, tw.toQ, k)
      if (tw.t >= 1) {
        if (tw.to === 'interior') {
          phase.current = 'interior'
          // Jump to active spot on arrival if in spots mode
          if (viewModeRef.current === 'spots' && spotsRef.current?.length > 0) {
            const spot = spotsRef.current[activeSpotRef.current] ?? spotsRef.current[0]
            camera.position.set(clamp(spot.x, -BOUND_X, BOUND_X), standY.current, clamp(spot.z, -BOUND_Z, BOUND_Z))
            look.current.yaw   = spot.yaw
            look.current.pitch = -0.02
          }
          onEnter && onEnter()
        } else {
          phase.current = 'orbit'; applyOrbit(); onExit && onExit()
        }
        tween.current = null
      }
      return
    }

    if (ph === 'interior') {
      // Spot-to-spot tween
      if (spotTween.current) {
        const st = spotTween.current
        st.t = Math.min(1, st.t + dt / st.dur)
        const k = ease(st.t)
        camera.position.lerpVectors(st.fromP, st.toP, k)
        look.current.yaw = st.fromYaw + st.deltaYaw * k
        if (st.t >= 1) spotTween.current = null
      }

      camera.rotation.order = 'YXZ'
      camera.rotation.set(look.current.pitch, look.current.yaw, 0)

      // WASD only in free-roam mode
      if (viewModeRef.current === 'freeroam') {
        const k = keys.current, m = moveState
        let mx = 0, mz = 0
        if (k['KeyW'] || k['ArrowUp']    || m.f) mz += 1
        if (k['KeyS'] || k['ArrowDown']  || m.b) mz -= 1
        if (k['KeyA'] || k['ArrowLeft']  || m.l) mx -= 1
        if (k['KeyD'] || k['ArrowRight'] || m.r) mx += 1
        if (mx || mz) {
          const yaw = look.current.yaw
          const fwd   = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw))
          const right = new THREE.Vector3(-fwd.z, 0, fwd.x)
          const step  = new THREE.Vector3()
            .addScaledVector(fwd, mz)
            .addScaledVector(right, mx)
            .normalize()
            .multiplyScalar(6 * dt)
          const p = camera.position
          p.x = clamp(p.x + step.x, -BOUND_X, BOUND_X)
          p.z = clamp(p.z + step.z, -BOUND_Z, BOUND_Z)
        }
      }

      camera.position.y = standY.current

      // Write live position for floor-plan overlay and compass
      if (camRef) {
        camRef.current.x   = camera.position.x
        camRef.current.z   = camera.position.z
        camRef.current.yaw = look.current.yaw
      }
    }
  })

  return null
}
