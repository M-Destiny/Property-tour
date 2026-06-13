import { useEffect, useRef } from 'react'
import { FLOORS } from '../../data/floors.js'

export function FloorNav({ selected, onSelect }) {
  const refs = useRef([])

  useEffect(() => {
    if (selected !== null && refs.current[selected]) {
      refs.current[selected].scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selected])

  return (
    <nav className="nav">
      <div className="nav-head">Floor directory ↑</div>
      {/* render top-to-bottom visually via column-reverse in CSS */}
      {FLOORS.map((f, i) => (
        <button
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className={`floor-btn ${selected === i ? 'active' : ''}`}
          onClick={() => onSelect(i)}
        >
          <span className="fnum">{f.n}</span>
          <span>
            <span className="fname">{f.name}</span>
            <span className="fuse">{f.use}</span>
          </span>
          <span className="farea">{f.area} sf</span>
        </button>
      ))}
    </nav>
  )
}
