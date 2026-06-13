// Hand-built architectural floor plans returned as SVG strings.
// Injected via dangerouslySetInnerHTML in <FloorDrawer/>.

const W = '#2a2a2a', SW = 7
const FILL = { room: '#efeae0', wet: '#dfe6e8', out: '#e6ecd9', core: '#e2ddd2' }

const room = (x, y, w, h, fill = FILL.room) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${W}" stroke-width="${SW}"/>`
const lbl = (x, y, t, s = 13) =>
  `<text x="${x}" y="${y}" font-family="'Space Mono',monospace" font-size="${s}" fill="#5a5247" text-anchor="middle" letter-spacing="1">${t}</text>`
const area = (x, y, t) =>
  `<text x="${x}" y="${y}" font-family="'Space Mono',monospace" font-size="10" fill="#a59a86" text-anchor="middle">${t}</text>`
const door = (x, y, r, rot = 0) =>
  `<g transform="translate(${x},${y}) rotate(${rot})"><path d="M0,0 L${r},0 A${r},${r} 0 0,1 0,${r}" fill="none" stroke="#b7ad99" stroke-width="2"/><rect x="-2" y="-2" width="4" height="${r}" fill="${FILL.room}"/></g>`
const north = (x, y) =>
  `<g transform="translate(${x},${y})"><circle r="15" fill="none" stroke="#b7ad99" stroke-width="1.5"/><path d="M0,-11 L5,6 L0,2 L-5,6 Z" fill="#7a6a44"/><text y="-18" font-family="'Space Mono'" font-size="9" fill="#7a6a44" text-anchor="middle">N</text></g>`
const scale = (x, y) =>
  `<g transform="translate(${x},${y})"><line x1="0" y1="0" x2="80" y2="0" stroke="#7a6a44" stroke-width="1.5"/><line x1="0" y1="-4" x2="0" y2="4" stroke="#7a6a44" stroke-width="1.5"/><line x1="80" y1="-4" x2="80" y2="4" stroke="#7a6a44" stroke-width="1.5"/><text x="40" y="-7" font-family="'Space Mono'" font-size="9" fill="#7a6a44" text-anchor="middle">5 m</text></g>`
const VB = 'viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg"'
const frame = (inner) =>
  `<svg ${VB}><rect width="800" height="560" fill="#f6f2ea"/>${inner}${north(750, 46)}${scale(40, 520)}</svg>`

export const PLANS = {
  apartment: () => frame(`
    ${room(80, 60, 420, 260)}
    ${room(500, 60, 220, 150, FILL.wet)}
    ${room(500, 210, 220, 180)}
    ${room(80, 320, 200, 180)}
    ${room(280, 320, 140, 180, FILL.wet)}
    ${room(420, 320, 80, 90, FILL.wet)}
    ${room(420, 410, 80, 90, FILL.core)}
    ${room(500, 390, 220, 110, FILL.out)}
    <rect x="510" y="70" width="200" height="22" fill="#cfd6d8" stroke="${W}" stroke-width="2"/>
    <rect x="510" y="180" width="120" height="20" fill="#cfd6d8" stroke="${W}" stroke-width="2"/>
    <rect x="560" y="250" width="110" height="80" rx="6" fill="#d8d2c4" stroke="#b7ad99"/>
    <rect x="110" y="360" width="100" height="70" rx="6" fill="#d8d2c4" stroke="#b7ad99"/>
    <rect x="120" y="240" width="150" height="40" rx="8" fill="#d8d2c4" stroke="#b7ad99"/>
    ${door(500, 300, 34)} ${door(420, 320, 30, 90)} ${door(420, 500, 28, -90)}
    ${lbl(290, 180, 'LIVING / DINING', 15)} ${area(290, 200, '34.2 m²')}
    ${lbl(610, 120, 'KITCHEN')} ${area(610, 138, '12.0 m²')}
    ${lbl(610, 300, 'PRIMARY BED')} ${area(610, 318, '16.5 m²')}
    ${lbl(180, 420, 'BEDROOM 2')} ${area(180, 438, '12.8 m²')}
    ${lbl(350, 420, 'BATH')} ${lbl(460, 365, 'ENS')}
    ${lbl(460, 465, 'FOYER')} ${lbl(610, 455, 'BALCONY')} ${area(610, 473, '9.0 m²')}
  `),

  office: () => frame(`
    ${room(80, 60, 460, 300)}
    ${room(540, 60, 180, 140)}
    ${room(540, 200, 180, 120)}
    ${room(80, 360, 200, 140, FILL.core)}
    ${room(280, 360, 160, 140, FILL.wet)}
    ${room(440, 360, 140, 140, FILL.wet)}
    ${room(580, 360, 140, 140, FILL.core)}
    ${[120, 220, 320, 420].map(x => `<rect x="${x}" y="120" width="70" height="40" rx="3" fill="#d8d2c4" stroke="#b7ad99"/><rect x="${x}" y="220" width="70" height="40" rx="3" fill="#d8d2c4" stroke="#b7ad99"/>`).join('')}
    <rect x="565" y="95" width="130" height="60" rx="20" fill="#d8d2c4" stroke="#b7ad99"/>
    <rect x="565" y="230" width="130" height="50" rx="10" fill="#d8d2c4" stroke="#b7ad99"/>
    ${door(540, 150, 34, 90)} ${door(540, 260, 30, 90)} ${door(280, 420, 30)}
    ${lbl(310, 210, 'OPEN STUDIO', 15)} ${area(310, 230, '180 m²')}
    ${lbl(630, 135, 'BOARDROOM')} ${lbl(630, 265, 'MEETING')}
    ${lbl(180, 435, 'RECEPTION')} ${lbl(360, 435, 'PANTRY')}
    ${lbl(510, 435, 'WC')} ${lbl(650, 435, 'LIFTS')}
  `),

  lobby: () => frame(`
    ${room(80, 60, 640, 300)}
    ${room(80, 360, 260, 140, FILL.core)}
    ${room(340, 360, 200, 140, FILL.wet)}
    ${room(540, 360, 180, 140, FILL.core)}
    <rect x="300" y="250" width="200" height="46" rx="10" fill="#cfc6b0" stroke="#b7ad99"/>
    <rect x="130" y="110" width="120" height="44" rx="14" fill="#d8d2c4" stroke="#b7ad99"/>
    <rect x="560" y="110" width="120" height="44" rx="14" fill="#d8d2c4" stroke="#b7ad99"/>
    <circle cx="400" cy="150" r="34" fill="none" stroke="#b7ad99" stroke-width="2"/>
    ${[560, 615, 670].map(x => `<rect x="${x}" y="380" width="40" height="40" fill="#cfd6d8" stroke="${W}" stroke-width="2"/>`).join('')}
    ${door(540, 430, 34, 90)}
    ${lbl(400, 210, 'ARRIVAL HALL', 16)} ${area(400, 330, 'double-height · 21 ft')}
    ${lbl(210, 435, 'CONCIERGE')} ${lbl(440, 435, 'WC')} ${lbl(630, 440, 'LIFTS')}
    ${lbl(400, 100, 'ART WALL', 11)}
  `),

  amenity: () => frame(`
    ${room(80, 60, 320, 280)}
    ${room(400, 60, 320, 150)}
    ${room(400, 210, 200, 130)}
    ${room(600, 210, 120, 130, FILL.wet)}
    ${room(80, 340, 640, 160, FILL.out)}
    <path d="M110,90 q140,-10 250,40" fill="none" stroke="#b7ad99" stroke-width="10"/>
    <rect x="120" y="200" width="120" height="44" rx="14" fill="#d8d2c4" stroke="#b7ad99"/>
    <rect x="260" y="200" width="120" height="44" rx="14" fill="#d8d2c4" stroke="#b7ad99"/>
    ${[440, 500, 560, 620, 680].map(x => `<circle cx="${x}" cy="120" r="14" fill="#d8d2c4" stroke="#b7ad99"/>`).join('')}
    ${[200, 400, 600].map(x => `<circle cx="${x}" cy="420" r="20" fill="#f0d9b8" stroke="#c9a86a" stroke-width="2"/>`).join('')}
    ${door(400, 280, 34, 90)} ${door(300, 340, 34)}
    ${lbl(240, 180, 'COCKTAIL LOUNGE', 14)} ${lbl(240, 70, 'BAR', 10)}
    ${lbl(560, 150, 'FITNESS SUITE')} ${lbl(500, 285, 'SCREENING')}
    ${lbl(660, 285, 'CHANGING')}
    ${lbl(400, 400, 'SKY TERRACE', 15)} ${area(400, 460, 'wrap-around · fire pits')}
  `),

  penthouse: () => frame(`
    ${room(80, 60, 420, 300)}
    ${room(500, 60, 220, 180, FILL.wet)}
    ${room(500, 240, 220, 160)}
    ${room(80, 360, 180, 140)}
    ${room(260, 360, 150, 140)}
    ${room(410, 360, 90, 140, FILL.wet)}
    ${room(500, 400, 220, 100, FILL.core)}
    <rect x="40" y="20" width="720" height="520" fill="none" stroke="#c9a86a" stroke-width="2" stroke-dasharray="6 6"/>
    <rect x="120" y="120" width="200" height="50" rx="10" fill="#d8d2c4" stroke="#b7ad99"/>
    <rect x="140" y="240" width="160" height="44" rx="8" fill="#d8d2c4" stroke="#b7ad99"/>
    <rect x="520" y="80" width="180" height="22" fill="#cfd6d8" stroke="${W}" stroke-width="2"/>
    <rect x="560" y="290" width="110" height="80" rx="6" fill="#d8d2c4" stroke="#b7ad99"/>
    ${door(500, 320, 34)} ${door(410, 420, 30, 90)}
    ${lbl(290, 190, 'GREAT ROOM', 16)} ${area(290, 300, '62 m² · 12 ft ceilings')}
    ${lbl(610, 150, 'CHEF KITCHEN')} ${lbl(610, 320, 'PRIMARY SUITE')}
    ${lbl(170, 435, 'BED 2')} ${lbl(335, 435, 'BED 3')} ${lbl(455, 435, 'BATH')}
    ${lbl(610, 455, 'WINE · LIFT')}
    ${lbl(400, 32, '360° WRAP TERRACE', 11)}
  `),
}
