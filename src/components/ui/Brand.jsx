export function Brand({ onContact }) {
  return (
    <header className="brand">
      <div className="id">
        <span className="kicker">BKC · Bandra Kurla Complex</span>
        <h1>Mumbai Tower</h1>
        <span className="sub">Mixed-use tower · 14 levels · IGBC Platinum</span>
      </div>
      <div className="brand-right">
        <div className="meta">
          {[['312k', 'sq ft'], ['14', 'floors'], ['2026', 'delivery']].map(([n, l]) => (
            <div className="stat" key={l}>
              <span className="num">{n}</span>
              <span className="lab">{l}</span>
            </div>
          ))}
        </div>
        <button className="contact-btn" onClick={onContact}>Contact Us</button>
      </div>
    </header>
  )
}
