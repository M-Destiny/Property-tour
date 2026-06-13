// Shared, mutable movement state. The on-screen walk pad (DOM) writes to it;
// the in-Canvas TourController reads it each frame. Keeps walk controls working
// on touch devices without a keyboard.
export const moveState = { f: false, b: false, l: false, r: false }
