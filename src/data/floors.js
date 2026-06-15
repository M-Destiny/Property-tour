// Floor program, bottom -> top. `plan` keys into plans.jsx.
export const FLOORS = [
  { n: ‘L’,  name: ‘Lobby & Arrival’,    use: ‘Public · Reception’, area: ‘8,400’, plan: ‘lobby’,
    beds: ‘—‘, baths: ‘—‘, ceil: "21’", status: ‘available’, price: ‘—‘,
    blurb: ‘A double-height arrival hall in book-matched stone, with concierge, a curated art wall and direct access to the transit concourse.’,
    amen: [‘24/7 Concierge’, ‘Valet’, ‘Art Program’, ‘EV Drop-off’] },
  { n: ‘02’, name: ‘Retail Galleria’,    use: ‘Retail’, area: ‘7,900’, plan: ‘office’,
    beds: ‘—‘, baths: ‘2’, ceil: "16’", status: ‘available’, price: ‘On Request’,
    blurb: ‘Street-facing retail bays with flexible demising, ready for flagship boutiques, a wellness studio and grab-and-go dining.’,
    amen: [‘Flexible bays’, ‘High footfall’, ‘Storefront glazing’] },
  { n: ‘03’, name: ‘Café & Co-work’,     use: ‘Hospitality’, area: ‘7,900’, plan: ‘office’,
    beds: ‘—‘, baths: ‘2’, ceil: "14’", status: ‘available’, price: ‘On Request’,
    blurb: ‘A members co-working floor wrapped around a roastery café, with phone rooms, hot desks and a north-lit reading lounge.’,
    amen: [‘Roastery café’, ‘Phone rooms’, ‘Hot desks’, ‘Wi-Fi 7’] },
  { n: ‘04’, name: ‘Corporate Suite 04’, use: ‘Office’, area: ‘7,200’, plan: ‘office’,
    beds: ‘—‘, baths: ‘2’, ceil: "12’", status: ‘available’, price: ‘₹ 185 /sf/mo’,
    blurb: ‘Full-floor office with a glass-fronted reception, a boardroom on the corner and an open studio bathed in curtain-wall daylight.’,
    amen: [‘Full-floor’, ‘Boardroom’, ‘Raised floor’, ‘Dedicated HVAC’] },
  { n: ‘05’, name: ‘Corporate Suite 05’, use: ‘Office’, area: ‘7,200’, plan: ‘office’,
    beds: ‘—‘, baths: ‘2’, ceil: "12’", status: ‘reserved’, price: ‘₹ 185 /sf/mo’,
    blurb: ‘Identical premium plate to 04 — column-free open studio, two meeting suites and a pantry with skyline views east.’,
    amen: [‘Column-free’, ‘2 meeting suites’, ‘Pantry’, ‘Skyline views’] },
  { n: ‘06’, name: ‘Corporate Suite 06’, use: ‘Office’, area: ‘7,200’, plan: ‘office’,
    beds: ‘—‘, baths: ‘2’, ceil: "12’", status: ‘available’, price: ‘₹ 190 /sf/mo’,
    blurb: ‘Mid-stack office plate with upgraded acoustics and a wellness room, leasing as whole-floor or two demised suites.’,
    amen: [‘Demisable’, ‘Wellness room’, ‘Acoustic upgrade’] },
  { n: ‘07’, name: ‘Corporate Suite 07’, use: ‘Office’, area: ‘7,200’, plan: ‘office’,
    beds: ‘—‘, baths: ‘2’, ceil: "12’", status: ‘available’, price: ‘₹ 195 /sf/mo’,
    blurb: ‘A flexible office plate positioned for a growing HQ — reception, boardroom, open studio and a private terrace nook.’,
    amen: [‘HQ-ready’, ‘Terrace nook’, ‘Fibre-rich’] },
  { n: ‘08’, name: ‘Corporate Suite 08’, use: ‘Office’, area: ‘7,200’, plan: ‘office’,
    beds: ‘—‘, baths: ‘2’, ceil: "12’", status: ‘sold’, price: ‘₹ 200 /sf/mo’,
    blurb: ‘Top of the office stack with the longest sightlines, a glazed boardroom on the corner and a generous client pantry.’,
    amen: [‘Long sightlines’, ‘Glazed boardroom’, ‘Client pantry’] },
  { n: ‘09’, name: ‘Residence 09’, use: ‘Residential’, area: ‘1,180’, plan: ‘apartment’,
    beds: ‘2’, baths: ‘2’, ceil: "10’", status: ‘sold’, price: ‘₹ 6.8 Cr’,
    blurb: ‘A two-bedroom corner residence — open living wrapping a chef\’s kitchen, a primary suite with walk-in robe, and a glass balcony.’,
    amen: [‘2 bed · 2 bath’, ‘Chef kitchen’, ‘Walk-in robe’, ‘Glass balcony’] },
  { n: ‘10’, name: ‘Residence 10’, use: ‘Residential’, area: ‘1,180’, plan: ‘apartment’,
    beds: ‘2’, baths: ‘2’, ceil: "10’", status: ‘available’, price: ‘₹ 7.2 Cr’,
    blurb: ‘Stacked above 09 with a brighter aspect — engineered oak floors, integrated appliances and a utility off the foyer.’,
    amen: [‘2 bed · 2 bath’, ‘Oak floors’, ‘Integrated appliances’] },
  { n: ‘11’, name: ‘Residence 11’, use: ‘Residential’, area: ‘1,240’, plan: ‘apartment’,
    beds: ‘2’, baths: ‘2’, ceil: "10’", status: ‘reserved’, price: ‘₹ 7.8 Cr’,
    blurb: ‘A slightly larger plate with a study alcove off the living room and a deeper balcony facing the park.’,
    amen: [‘2 bed + study’, ‘Park-facing’, ‘Deeper balcony’] },
  { n: ‘12’, name: ‘Residence 12’, use: ‘Residential’, area: ‘1,240’, plan: ‘apartment’,
    beds: ‘2’, baths: ‘2’, ceil: "10’", status: ‘available’, price: ‘₹ 8.2 Cr’,
    blurb: ‘The last of the standard residences — same generous layout, with smart-home pre-wiring and motorised shades.’,
    amen: [‘Smart-home’, ‘Motorised shades’, ‘Storage cage’] },
  { n: ‘13’, name: ‘Sky Lounge’, use: ‘Amenities’, area: ‘6,800’, plan: ‘amenity’,
    beds: ‘—‘, baths: ‘2’, ceil: "15’", status: ‘available’, price: ‘Residents Only’,
    blurb: ‘The resident amenity floor — a cocktail lounge and bar, fitness suite, screening room and a wrap-around terrace with fire pits.’,
    amen: [‘Cocktail bar’, ‘Fitness suite’, ‘Screening room’, ‘Sky terrace’] },
  { n: ‘14’, name: ‘The Penthouse’, use: ‘Residential’, area: ‘3,400’, plan: ‘penthouse’,
    beds: ‘3’, baths: ‘3.5’, ceil: "12’", status: ‘available’, price: ‘₹ 42 Cr’,
    blurb: ‘A single full-floor penthouse — great room under 12-foot ceilings, three suites, a wine room and a 360° wrap terrace.’,
    amen: [‘3 bed · 3.5 bath’, ‘Wine room’, ‘360° terrace’, ‘Private lift’] },
]

// Geometry constants. Tuned so the procedural fallback AND the floor-selection
// bands line up with the real office GLB after it's normalised to MODEL_HEIGHT.
export const MODEL_HEIGHT = 100       // office GLB scaled to this world height
export const N = FLOORS.length
export const FH = MODEL_HEIGHT / N
export const BASE_Y = 0
export const TOW_W = 22, TOW_D = 15   // procedural-fallback footprint
export const POD_W = 30, POD_D = 22
export const PODIUM_LEVELS = 2
export const floorCenterY = (i) => BASE_Y + i * FH + FH / 2
export const floorBottomY = (i) => BASE_Y + i * FH
