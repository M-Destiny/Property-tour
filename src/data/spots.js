// 5 preset viewpoints per floor-plan type.
// x, z are within the walk bounds: x ∈ [-13.5, 13.5], z ∈ [-4.2, 4.2]
// yaw: camera yaw in radians. look direction = (-sin(yaw), 0, -cos(yaw))
//   -π/2 → facing +X (into room from left entry)
//    π   → facing -X (back toward entry)
//    0   → facing -Z (toward front wall)
//   π/2  → facing +Z (toward back wall)

export const SPOTS = {
  apartment: [
    { label: 'Entry',        desc: 'Key-fob entry · video intercom · engineered oak flooring',     x: -10,  z:  2.5, yaw: -Math.PI / 2 },
    { label: 'Living Room',  desc: 'Open-plan 34 m² · floor-to-ceiling glazing · city views',      x:  -3,  z: -1.5, yaw: -Math.PI / 2 },
    { label: 'Kitchen',      desc: '12 m² chef\'s kitchen · integrated appliances · island bench', x:   9,  z: -2.5, yaw:  Math.PI     },
    { label: 'Primary Bed',  desc: '16.5 m² · walk-in wardrobe · ensuite with heated floors',      x:   9,  z:  0.5, yaw:  Math.PI     },
    { label: 'Bedroom 2',    desc: '12.8 m² · park-facing outlook · built-in storage',             x:  -9,  z:  2.5, yaw: -Math.PI / 2 },
  ],
  office: [
    { label: 'Reception',    desc: 'Glass-fronted reception · visitor lounge · brand signage wall', x: -10,  z:  0,   yaw: -Math.PI / 2 },
    { label: 'Open Studio',  desc: '180 m² column-free plate · raised floor · 12 ft ceilings',     x:   0,  z: -1,   yaw: -Math.PI / 2 },
    { label: 'Boardroom',    desc: 'Corner glazed boardroom · AV-integrated · seats 14',            x:   9,  z: -3,   yaw:  Math.PI     },
    { label: 'Meeting Room', desc: 'Acoustic meeting suite · writable walls · skyline views',       x:   9,  z:  2,   yaw:  Math.PI     },
    { label: 'Pantry',       desc: 'Staff pantry · barista-grade coffee · informal breakout',       x:   0,  z:  3.5, yaw:  Math.PI / 2 },
  ],
  lobby: [
    { label: 'Entrance',     desc: 'Revolving door · street-level arrival · 24/7 access',          x: -12,  z:  0,   yaw: -Math.PI / 2 },
    { label: 'Arrival Hall', desc: 'Double-height hall · book-matched stone · curated art wall',    x:   0,  z: -1.5, yaw: -Math.PI / 2 },
    { label: 'Art Wall',     desc: 'Rotating art programme · 6 m height · gallery-lit',            x:   7,  z: -1,   yaw:  Math.PI     },
    { label: 'Concierge',    desc: '24/7 concierge desk · parcel management · valet drop-off',     x:  -6,  z: -2.5, yaw: -Math.PI / 4 },
    { label: 'Lifts',        desc: 'Destination-control lifts · 2 s average wait · service lift',  x:   8,  z:  2.5, yaw:  Math.PI     },
  ],
  amenity: [
    { label: 'Bar',          desc: 'Resident cocktail bar · curated cellar · open Fri–Sun evenings', x:  -6,  z: -3,   yaw: -Math.PI / 4 },
    { label: 'Lounge',       desc: 'Social lounge · library nook · Wi-Fi 7 throughout',              x:  -1,  z: -1,   yaw: -Math.PI / 2 },
    { label: 'Fitness',      desc: 'Technogym-equipped · Peloton bikes · private training studio',   x:   9,  z: -2.5, yaw:  Math.PI     },
    { label: 'Screening',    desc: '4 K laser projection · Dolby Atmos sound · 18 seats',            x:   9,  z:  2,   yaw:  Math.PI     },
    { label: 'Sky Terrace',  desc: 'Wrap-around terrace · fire pits · 360° skyline panorama',        x:   0,  z:  3.8, yaw: -Math.PI / 2 },
  ],
  penthouse: [
    { label: 'Great Room',   desc: '62 m² great room · 12 ft ceilings · motorised shades',            x:  -2,  z:  0,   yaw: -Math.PI / 2 },
    { label: 'Chef Kitchen', desc: 'Sub-Zero · Wolf range · Calacatta marble island · butler\'s pantry', x:   9,  z: -3,   yaw:  Math.PI     },
    { label: 'Primary Suite',desc: 'His & hers wardrobes · spa bath · private terrace access',          x:   9,  z:  2,   yaw:  Math.PI     },
    { label: 'Bedroom 2',    desc: 'Ensuite · study nook · city aspect · blackout shading',             x:  -4,  z:  3.5, yaw: -Math.PI / 2 },
    { label: 'Wine Room',    desc: 'Temperature-controlled wine room · 200-bottle capacity',            x:  11,  z:  2.5, yaw:  Math.PI     },
  ],
}
