import { useEffect, useRef } from 'react'
import { FLOORS } from '../../data/floors.js'

const STATUS_COLOR = { available: '#4caf7d', reserved: '#e0a020', sold: '#e05050' }
const STATUS_LABEL = { available: 'Available', reserved: 'Reserved', sold: 'Sold' }

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
      {FLOORS.map((f, i) => (
        <button
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className={`floor-btn ${selected === i ? 'active' : ''}`}
          onClick={() => onSelect(i)}
        >
          <span className="fnum">{f.n}</span>
          <span className="fname-wrap">
            <span className="fname">{f.name}</span>
            <span className="fuse">{f.use}</span>
          </span>
          <span className="fnav-right">
            <span className="farea">{f.area} sf</span>
            {f.status && (
              <span className="fstatus" style={{ color: STATUS_COLOR[f.status] }}>
                <span className="fstatus-dot" style={{ background: STATUS_COLOR[f.status] }} />
                {STATUS_LABEL[f.status]}
              </span>
            )}
          </span>
        </button>
      ))}
    </nav>
  )
}
