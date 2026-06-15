const STATS = [
  { num: "62%",  label: "more likely to purchase", sub: "with 3D visualization  ·  Medium" },
  { num: "45%",  label: "higher conversion rate",   sub: "with interactive tours  ·  HubSpot" },
  { num: "73%",  label: "prioritize experience",    sub: "over price alone  ·  PwC" },
  { num: "<1s",  label: "loading time",             sub: "WebGL — no app required" },
]

export function StatsStrip() {
  return (
    <div className="stats-strip">
      {STATS.map((s) => (
        <div className="ss-item" key={s.num}>
          <span className="ss-num">{s.num}</span>
          <span className="ss-label">{s.label}</span>
          <span className="ss-sub">{s.sub}</span>
        </div>
      ))}
    </div>
  )
}
