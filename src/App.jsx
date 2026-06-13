import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import { Experience } from './components/Experience.jsx'
import { Brand } from './components/ui/Brand.jsx'
import { FloorNav } from './components/ui/FloorNav.jsx'
import { FloorDrawer } from './components/ui/FloorDrawer.jsx'
import { WalkPad } from './components/ui/WalkPad.jsx'
import { FLOORS, N } from './data/floors.js'
import { SPOTS } from './data/spots.js'

function LoadingScreen() {
  const { progress, active } = useProgress()
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (!active && progress >= 99) {
      const t = setTimeout(() => setGone(true), 700)
      return () => clearTimeout(t)
    }
  }, [active, progress])
  if (gone) return null
  return (
    <div className={`ls ${!active ? 'ls-out' : ''}`}>
      <div className="ls-inner">
        <div className="ls-name">Peachtree Tower</div>
        <div className="ls-sub">Atlanta, Georgia</div>
        <div className="ls-track"><div className="ls-bar" style={{ width: `${progress}%` }} /></div>
        <div className="ls-pct">{Math.round(progress)}%</div>
      </div>
    </div>
  )
}

export default function App() {
  const [selected,  setSelected]  = useState(null)
  const [hovered,   setHovered]   = useState(null)
  const [inside,    setInside]    = useState(false)
  const [planOpen,  setPlanOpen]  = useState(false)
  const [viewMode,  setViewMode]  = useState('spots')
  const [activeSpot,setActiveSpot]= useState(0)
  const [tod,          setTod]          = useState('day')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const camRef     = useRef({ x: 0, z: 0, yaw: -Math.PI / 2 })
  const compassRef = useRef(null)

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
    else document.exitFullscreen?.()
  }
  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', h)
    return () => document.removeEventListener('fullscreenchange', h)
  }, [])

  // Compass: RAF-based needle rotation reading camRef directly (no React re-renders)
  useEffect(() => {
    if (!inside) return
    let raf
    const tick = () => {
      if (compassRef.current) {
        const deg = -camRef.current.yaw * 180 / Math.PI
        compassRef.current.style.transform = `rotate(${deg}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inside])

  const enterFloor = (i) => {
    setPlanOpen(false); setSelected(i); setActiveSpot(0); setViewMode('spots')
  }
  const exit = () => { setPlanOpen(false); setSelected(null) }

  const active = selected !== null
  const f      = active ? FLOORS[selected] : null
  const spots  = f ? (SPOTS[f.plan] ?? []) : []

  const handleSpotKey = (idx) => {
    if (idx === 'prev') setActiveSpot(i => (i - 1 + spots.length) % spots.length)
    else if (idx === 'next') setActiveSpot(i => (i + 1) % spots.length)
    else setActiveSpot(Math.min(idx, spots.length - 1))
  }

  const currentSpot = inside && viewMode === 'spots' ? spots[activeSpot] : null

  return (
    <div className={`app ${active ? 'is-tour' : ''}`}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 55, position: [120, 60, 120], near: 0.1, far: 2000 }}>
        <Experience
          selected={selected} hovered={hovered}
          setSelected={enterFloor} setHovered={setHovered}
          onEnter={() => setInside(true)} onExit={() => setInside(false)}
          viewMode={viewMode} activeSpot={activeSpot} spots={spots}
          camRef={camRef} onSpotSelect={setActiveSpot} onSpotKey={handleSpotKey}
          tod={tod}
        />
      </Canvas>

      <Brand />
      <FloorNav selected={selected} onSelect={enterFloor} />

      {/* Time-of-day toggle — always visible */}
      <div className="tod-bar">
        {['day','dusk','night'].map(t => (
          <button key={t} className={`tod-btn ${tod === t ? 'active' : ''}`} onClick={() => setTod(t)}>
            {t === 'day' ? '☀ Day' : t === 'dusk' ? '🌅 Dusk' : '🌙 Night'}
          </button>
        ))}
      </div>

      {!active && (
        <div className="hint">
          <span><b>Drag</b> to orbit</span><span className="dot" />
          <span><b>Scroll</b> to zoom</span><span className="dot" />
          <span><b>Click a floor</b> to step inside</span>
        </div>
      )}

      {/* Spot rail */}
      {inside && viewMode === 'spots' && spots.length > 0 && (
        <div className="spot-rail">
          {spots.map((sp, i) => (
            <button key={i} className={`spot-card ${i === activeSpot ? 'active' : ''}`}
              onClick={() => setActiveSpot(i)}>
              <span className="sc-idx">{i + 1}</span>
              <span className="sc-label">{sp.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Room info card for current spot */}
      {currentSpot?.desc && (
        <div className="spot-info">
          <span className="si-label">{currentSpot.label}</span>
          <span className="si-desc">{currentSpot.desc}</span>
        </div>
      )}

      {/* Interior HUD */}
      {active && (
        <div className="ihud show">
          <div className="meta-l">
            <span className="ik">{inside ? 'Level' : 'Entering'} {f.n} · {f.use}</span>
            <span className="it">{f.name}</span>
            <span className="is">
              {!inside ? 'Flying in…'
                : viewMode === 'spots' ? 'Press 1–5 · ← → to cycle spots · drag to look'
                : 'W A S D / arrows to walk · drag to look'}
            </span>
          </div>
          <div className="ibtns">
            <button className="ibtn" onClick={exit}>◀ Back</button>
            {inside && (
              <div className="mode-toggle">
                <button className={`ibtn ${viewMode === 'spots'   ? 'solid' : ''}`} onClick={() => setViewMode('spots')}>Spots</button>
                <button className={`ibtn ${viewMode === 'freeroam'? 'solid' : ''}`} onClick={() => setViewMode('freeroam')}>Free Roam</button>
              </div>
            )}
            <button className="ibtn" onClick={() => setPlanOpen(true)}>Floor Plan</button>
            <button className="ibtn solid" onClick={() => enterFloor(Math.min(N - 1, selected + 1))}>Next ↑</button>
          </div>
        </div>
      )}

      {/* Compass */}
      {inside && (
        <div className="compass">
          <svg width="44" height="44" viewBox="0 0 44 44" className="compass-bg">
            <circle cx="22" cy="22" r="20" fill="rgba(14,17,22,0.88)" stroke="#2A323D" strokeWidth="1.5"/>
            <text x="22" y="10"  textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="Space Mono">N</text>
            <text x="22" y="37"  textAnchor="middle" fill="#3a4050" fontSize="7" fontFamily="Space Mono">S</text>
            <text x="8"  y="24"  textAnchor="middle" fill="#3a4050" fontSize="7" fontFamily="Space Mono">W</text>
            <text x="36" y="24"  textAnchor="middle" fill="#3a4050" fontSize="7" fontFamily="Space Mono">E</text>
          </svg>
          <div className="compass-needle" ref={compassRef}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <polygon points="22,6 19,22 22,18 25,22"  fill="#C9A86A"/>
              <polygon points="22,38 19,22 22,26 25,22" fill="#2a3040"/>
            </svg>
          </div>
        </div>
      )}

      {/* Crosshair in free-roam */}
      {inside && viewMode === 'freeroam' && <div className="crosshair" />}

      {inside && viewMode === 'freeroam' && <WalkPad />}

      <FloorDrawer
        floor={selected} open={planOpen} onClose={() => setPlanOpen(false)}
        onEnter={enterFloor} inTour={inside} camRef={camRef}
      />

      {/* Fullscreen button */}
      <button className="fs-btn" onClick={toggleFullscreen} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
        {isFullscreen ? '⛶' : '⛶'}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {isFullscreen
            ? <><path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
            : <><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
          }
        </svg>
      </button>

      <LoadingScreen />
    </div>
  )
}
