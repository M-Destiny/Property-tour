import { moveState } from '../tourInput.js'

function PadBtn({ dir, label }) {
  const set = (v) => () => { moveState[dir] = v }
  return (
    <button
      className={`pad pad-${dir}`}
      onPointerDown={set(true)}
      onPointerUp={set(false)}
      onPointerLeave={set(false)}
      onPointerCancel={set(false)}
      aria-label={dir}
    >{label}</button>
  )
}

export function WalkPad() {
  return (
    <div className="walkpad" onContextMenu={(e) => e.preventDefault()}>
      <PadBtn dir="f" label="▲" />
      <div className="walkpad-mid">
        <PadBtn dir="l" label="◀" />
        <PadBtn dir="b" label="▼" />
        <PadBtn dir="r" label="▶" />
      </div>
    </div>
  )
}
