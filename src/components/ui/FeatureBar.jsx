const FEATURES = [
  { icon: "⬡", label: "Interactive 3D Tour" },
  { icon: "☀", label: "Day · Dusk · Night" },
  { icon: "📐", label: "Live Floor Plans" },
  { icon: "📍", label: "Live Availability" },
  { icon: "📱", label: "All Devices" },
]

export function FeatureBar() {
  return (
    <div className="feat-bar">
      {FEATURES.map((f, i) => (
        <span className="fb-item" key={i}>
          <span className="fb-icon">{f.icon}</span>
          {f.label}
        </span>
      ))}
    </div>
  )
}
