export function Brand() {
  return (
    <header className="brand">
      <div className="id">
        <span className="kicker">Midtown · Peachtree St</span>
        <h1>Peachtree Atlanta</h1>
        <span className="sub">Mixed-use tower · 14 levels · LEED Platinum</span>
      </div>
      <div className="meta">
        {[['312k', 'sq ft'], ['14', 'floors'], ['2026', 'delivery']].map(([n, l]) => (
          <div className="stat" key={l}>
            <span className="num">{n}</span>
            <span className="lab">{l}</span>
          </div>
        ))}
      </div>
    </header>
  )
}
