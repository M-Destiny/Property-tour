import { useEffect, useState } from 'react'

const STATUS_COLOR = { available: '#4caf7d', reserved: '#e0a020', sold: '#e05050' }
const STATUS_LABEL = { available: 'Available', reserved: 'Reserved', sold: 'Sold' }

export function WelcomeCard({ floor, onEnquire }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Animate in on mount, auto-dismiss after 6 s
  useEffect(() => {
    setDismissed(false)
    const showT  = setTimeout(() => setVisible(true), 120)
    const hideT  = setTimeout(() => setDismissed(true), 6200)
    return () => { clearTimeout(showT); clearTimeout(hideT) }
  }, [floor])

  if (!floor || dismissed) return null

  const highlights = floor.amen.slice(0, 3)

  return (
    <div className={`wcard ${visible ? 'wcard--in' : ''}`}>
      <button className="wcard-close" onClick={() => setDismissed(true)}>✕</button>

      <div className="wcard-eyebrow">Floor {floor.n} · {floor.use}</div>
      <div className="wcard-title">{floor.name}</div>

      <div className="wcard-meta">
        {floor.price && floor.price !== '—' && (
          <span className="wcard-price">{floor.price}</span>
        )}
        {floor.status && (
          <span className="wcard-status" style={{ color: STATUS_COLOR[floor.status] }}>
            <span className="wcard-dot" style={{ background: STATUS_COLOR[floor.status] }} />
            {STATUS_LABEL[floor.status]}
          </span>
        )}
      </div>

      <div className="wcard-chips">
        {highlights.map((a) => (
          <span className="wcard-chip" key={a}>{a}</span>
        ))}
      </div>

      <button className="wcard-enquire" onClick={onEnquire}>
        Enquire about this floor →
      </button>
    </div>
  )
}
