import { useEffect, useRef } from 'react'
import { FLOORS } from '../../data/floors.js'
import { PLANS } from '../../data/plans.js'

// Map world coords to percentage position within the plan SVG wrapper.
// SVG viewBox is 800×560; rooms fill roughly x: 80–720, y: 60–500.
// World: x ∈ [-13.5, 13.5], z ∈ [-4.2, 4.2].
// Convention: world +X = SVG right, world +Z = SVG bottom.
function worldToPct(wx, wz) {
  const lx = (wx + 13.5) / 27          // 0..1
  const lz = (wz + 4.2)  / 8.4         // 0..1
  const svgX = 80  + lx * 640          // pixels in SVG space
  const svgY = 60  + lz * 440
  return { left: svgX / 800 * 100, top: svgY / 560 * 100 }
}

export function FloorDrawer({ floor, open, onClose, onEnter, inTour, camRef }) {
  const show = open && floor !== null
  const f = floor !== null ? FLOORS[floor] : null

  const dotRef = useRef(null)

  // Animate the live-location dot using RAF (avoids React re-renders)
  useEffect(() => {
    if (!show || !inTour || !camRef) return
    let raf
    const tick = () => {
      if (!dotRef.current) { raf = requestAnimationFrame(tick); return }
      const { x, z, yaw } = camRef.current
      const { left, top } = worldToPct(x, z)
      // CSS rotation: yaw=0 → arrow points up (-Z); yaw=-π/2 → arrow points right (+X)
      const deg = -yaw * 180 / Math.PI
      dotRef.current.style.left      = `${left}%`
      dotRef.current.style.top       = `${top}%`
      dotRef.current.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [show, inTour, camRef])

  return (
    <aside className={`drawer ${show ? 'open' : ''}`}>
      {f && (
        <>
          <div className="dr-top">
            <div>
              <div className="dnum">Floor {f.n} · {f.use}</div>
              <h2>{f.name}</h2>
              <div className="dsub">{f.area} sq ft · {f.ceil} ceilings</div>
            </div>
            <button className="close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          <div className="dr-body">
            <div className="specs">
              {[['Area', `${f.area} sf`], ['Beds', f.beds], ['Baths', f.baths], ['Ceiling', f.ceil]].map(([l, v]) => (
                <div className="spec" key={l}>
                  <div className="sl">{l}</div>
                  <div className="sv">{v}</div>
                </div>
              ))}
            </div>
            {f.price && f.price !== '—' && (
              <div className="dr-price-row">
                <span className="dr-price">{f.price}</span>
                {f.status && (
                  <span className={`dr-status dr-status--${f.status}`}>
                    {f.status === 'available' ? '● Available' : f.status === 'reserved' ? '● Reserved' : '● Sold'}
                  </span>
                )}
              </div>
            )}

            <div className="plan-wrap">
              <span className="plan-tag">Architectural plan · 1:100</span>
              <div dangerouslySetInnerHTML={{ __html: PLANS[f.plan]() }} />
              {/* Live location dot — only shown when touring */}
              {inTour && (
                <div className="loc-dot" ref={dotRef} title="Your position">
                  <svg width="22" height="22" viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="7" fill="#C9A86A" stroke="#fff" strokeWidth="2" opacity="0.92" />
                    {/* Direction arrow pointing up by default */}
                    <polygon points="11,2 8,9 11,7 14,9" fill="#fff" />
                  </svg>
                </div>
              )}
            </div>

            <p className="blurb">{f.blurb}</p>
            <div className="amen">
              {f.amen.map((a) => <span className="chip" key={a}><b>·</b> {a}</span>)}
            </div>

            <div className="dr-cta">
              {!inTour && <button className="btn primary" onClick={() => onEnter(floor)}>Step inside ↵</button>}
              <button className="btn" onClick={onClose}>Close</button>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
