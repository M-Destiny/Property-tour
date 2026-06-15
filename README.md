# Mumbai Tower — Interactive 3D Property Tour

> A fully interactive, browser-based 3D walkthrough of a mixed-use high-rise in Bandra Kurla Complex, Mumbai, India. No app to download. No VR headset required. Just open it in any modern browser and explore.

---

## What Is This?

Imagine being able to walk through an apartment, office, or penthouse before it's even built — from anywhere in the world, on any device. That's exactly what this is.

**Mumbai Tower** is a real estate presentation tool that puts a full 14-floor building in your browser. You can orbit around the exterior, click any floor to fly to a bird's-eye overview, then step inside and walk around — all in real time, all in 3D.

Think of it like Google Street View, but for a building that lives entirely in your browser.

---

## What Can You Do In The Tour?

### On the Outside (Exterior View)
- **Rotate** the building by clicking and dragging with your mouse
- **Zoom** in and out by scrolling your mouse wheel (or pinching on a touchscreen)
- **Click any floor band** on the building to fly to a top-down overview of that level
- Use the **floor navigator panel** on the right to jump directly to any of the 14 floors
- A **stats strip** at the bottom shows key industry stats (62% more likely to purchase with 3D, etc.)
- **Feature pills** below the header highlight tour capabilities at a glance

### When You Click a Floor — Top View (Default)
A bird's-eye slanted overview of the floor loads first:
- **Scroll** to zoom in and out
- **Clickable room pins** float above each viewpoint — click any pin to fly straight down into that room
- Switch to **Spots** or **Free Roam** using the bottom bar to step inside in first-person

### Once You're Inside a Floor
There are **two modes** you can switch between:

#### 1. Spots Mode
Five hand-picked viewpoints placed throughout the room:
- Click any **spot card** along the bottom to teleport to that viewpoint
- Use **keyboard keys 1 through 5** to jump instantly to a spot
- Use the **← → arrow keys** to cycle through spots one by one
- **Drag** to look around from wherever you're standing
- **Floating 3D labels** show you where each room is — click them to go there

#### 2. Free Roam Mode
Full first-person walking:
- **W / A / S / D** keys (or arrow keys) to walk forward, left, backward, right
- **Drag** to look around
- On touch devices, use the **on-screen directional pad**

### Other Controls
| Button | What It Does |
|--------|-------------|
| **Top View** | Returns to the bird's-eye overview of the current floor |
| **Spots** | Flies into first-person at the first room viewpoint |
| **Free Roam** | Flies into first-person free walk mode |
| **Floor Plan** | Opens a detailed architectural drawing of the current floor |
| **Back (◀)** | Exits the floor and returns to the exterior orbit view |
| **Next ↑** | Goes up to the next floor without going back to the exterior |
| **☀ Day / 🌅 Dusk / 🌙 Night** | Changes the time of day — affects sky, lighting, and window glow |
| **Fullscreen** (bottom-right) | Expands the tour to fill your entire screen |

### Floor Plan — Live Location Dot
When the floor plan drawer is open and you're inside a floor, a **gold dot with a direction arrow** shows your exact position on the architectural drawing — updates in real time as you move.

### Compass
A rotating compass needle appears in the top-right when you're in first-person, showing which direction you're facing at all times.

### Availability & Pricing
Every floor shows a **live availability status** (Available · Reserved · Sold) with a colored dot and price in the floor navigator and floor drawer.

### Welcome Card
When you first enter a floor, an **animated info card** slides in showing the floor name, price, status, and top amenities. Auto-dismisses after 6 seconds.

### Enquire About This Floor
A **gold floating button** appears inside every floor. Clicking it opens the Contact Us form with the floor name pre-filled — so enquiries arrive already qualified.

---

## The Building — 14 Floors

| Floor | Name | Type | Price | Key Features |
|-------|------|------|-------|-------------|
| L | Lobby & Arrival | Public / Reception | — | Double-height hall, concierge, art wall, EV drop-off |
| 02 | Retail Galleria | Retail | On Request | Flexible bays, storefront glazing, high footfall |
| 03 | Café & Co-work | Hospitality | On Request | Roastery café, hot desks, phone rooms, Wi-Fi 7 |
| 04 | Corporate Suite 04 | Office | ₹ 185 /sf/mo | Full-floor, boardroom, raised floor |
| 05 | Corporate Suite 05 | Office | ₹ 185 /sf/mo | Column-free, 2 meeting suites — Reserved |
| 06 | Corporate Suite 06 | Office | ₹ 190 /sf/mo | Demisable, wellness room |
| 07 | Corporate Suite 07 | Office | ₹ 195 /sf/mo | HQ-ready, terrace nook |
| 08 | Corporate Suite 08 | Office | ₹ 200 /sf/mo | Long sightlines, glazed boardroom — Sold |
| 09 | Residence 09 | Residential | ₹ 6.8 Cr | 2 bed · 2 bath, chef kitchen, balcony — Sold |
| 10 | Residence 10 | Residential | ₹ 7.2 Cr | 2 bed · 2 bath, oak floors |
| 11 | Residence 11 | Residential | ₹ 7.8 Cr | 2 bed + study, park-facing — Reserved |
| 12 | Residence 12 | Residential | ₹ 8.2 Cr | Smart-home, motorised shades |
| 13 | Sky Lounge | Amenities | Residents Only | Cocktail bar, fitness, screening room, sky terrace |
| 14 | The Penthouse | Residential | ₹ 42 Cr | 3 bed · 3.5 bath, wine room, 360° terrace |

---

## Features At A Glance

- **Real-time 3D rendering** — WebGL in the browser, no plugin needed
- **Top-down floor overview** — bird's-eye slanted view with scroll-to-zoom when clicking a floor
- **Clickable room pins in top view** — click a pin to fly straight into that room
- **Day / Dusk / Night** — three atmospheric presets changing sky, sun, window glow, and IBL lighting
- **Warm interior lighting** — amber ceiling downlights, cool window fill, golden bounce per time of day
- **Live availability & pricing** — colored dots (green/amber/red) with ₹ pricing on every floor
- **Welcome card** — animated slide-in card on floor entry with price and amenities
- **Enquire FAB** — floating "Enquire about this floor" button pre-fills the contact form
- **Contact Us → Google Sheets** — form submissions go directly to a Google Sheets CRM
- **Enclosed rooms** — ceiling, walls, and floor surfaces so you never see "through" the building
- **Clickable 3D hotspot pins** — floating room labels in 3D space
- **Live compass** — always know which direction you're facing
- **Live floor plan dot** — see yourself on the architectural drawing in real time
- **Keyboard shortcuts** — 1–5 to jump to spots, ← → to cycle, W/A/S/D to walk
- **Smooth camera transitions** — animated fly-in, spot tween, top-view → first-person dive
- **Social proof stats strip** — industry statistics shown on the exterior landing view
- **Touch support** — pinch-to-zoom, on-screen directional pad
- **High performance** — GPU-instanced windows, selective shadow casting, RAF-based animations

---

## Getting Started

### What You Need
- [Node.js](https://nodejs.org/) version 18 or higher
- A modern browser (Chrome, Edge, Firefox, or Safari — 2022 or later)
- The project files (this repository)

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Start the development server
```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### Step 3 — Build for production (optional)
```bash
npm run build
```

Outputs a `dist/` folder ready for Netlify, Vercel, or any static host.

---

## Contact Form → Google Sheets Setup

The Contact Us form posts to a Google Apps Script endpoint.

1. Open your Google Sheet and go to **Extensions → Apps Script**
2. Paste the contents of `google-apps-script.js`
3. Deploy as a **Web App** (execute as: Me, access: Anyone)
4. Copy the deployment URL into `src/components/ui/ContactPage.jsx` as `APPS_SCRIPT_URL`

The script uses `text/plain` content-type (no CORS preflight) and a `?t=timestamp` cache-bust parameter so every submission registers correctly.

---

## 3D Models

| File | Description |
|------|-------------|
| `public/models/office-building.glb` | Exterior building model |
| `public/models/apartment.glb` | Interior floor unit model |

If these files are missing the app falls back to a procedurally generated building.

---

## Project Structure

```
mumbai-tower/
│
├── public/
│   └── models/                   ← GLB model files
│
├── src/
│   ├── App.jsx                   ← State, layout, loading screen, fullscreen
│   ├── styles.css                ← All styling
│   │
│   ├── components/
│   │   ├── Experience.jsx        ← 3D scene: lighting, TOD, assembly
│   │   ├── TourController.jsx    ← Camera: orbit, topview, fly-in, first-person
│   │   ├── SceneEnv.jsx          ← Exterior: sky, ground, neighbour buildings
│   │   ├── OfficeBuilding.jsx    ← Main building GLB loader
│   │   ├── Building.jsx          ← Procedural fallback building
│   │   ├── FloorUnit.jsx         ← Interior apartment GLB per floor
│   │   ├── RoomShell.jsx         ← Ceiling, walls, floor, interior lights
│   │   ├── RoomHotspots.jsx      ← Clickable 3D room label pins
│   │   ├── Floor.jsx             ← Clickable floor bands on exterior
│   │   └── ui/
│   │       ├── Brand.jsx         ← Header bar with building stats
│   │       ├── FloorNav.jsx      ← Floor selector with availability dots
│   │       ├── FloorDrawer.jsx   ← Floor plan drawer + live location dot
│   │       ├── ContactPage.jsx   ← Contact form → Google Sheets
│   │       ├── WelcomeCard.jsx   ← Animated floor entry card
│   │       ├── StatsStrip.jsx    ← Social-proof stats on exterior view
│   │       ├── FeatureBar.jsx    ← Feature pills below header
│   │       └── WalkPad.jsx       ← On-screen directional pad (touch)
│   │
│   └── data/
│       ├── floors.js             ← 14 floor definitions, pricing, availability
│       ├── plans.js              ← SVG floor plan drawings
│       └── spots.js              ← 5 viewpoints per floor type
│
├── google-apps-script.js         ← Apps Script for Google Sheets CRM
├── index.html
├── vite.config.js
└── package.json
```

---

## Technology Stack

| Technology | Role |
|-----------|------|
| **React 18** | UI framework — state, panels, overlays |
| **Three.js 0.169** | 3D rendering engine |
| **React Three Fiber** | React ↔ Three.js bridge |
| **@react-three/drei** | HDRI environment, GLB loader, HTML labels, progress |
| **Vite 5** | Dev server and production bundler |
| **WebGL 2.0** | GPU rendering API |
| **Google Apps Script** | Serverless form-to-sheet backend |

---

## Camera System

Four states with smooth cubic ease-in-out transitions:

1. **Orbit** — exterior, drag to rotate, scroll to zoom
2. **Top View** — slanted bird's-eye per floor, scroll to zoom, click pins to dive in
3. **Flying** — animated transition between any two states (1.3–1.6 s)
4. **Interior** — first-person at eye height; Spots mode tweens between presets, Free Roam uses WASD

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 100+ | ✅ Full |
| Edge 100+ | ✅ Full |
| Firefox 100+ | ✅ Full |
| Safari 15.4+ | ✅ Full |
| Mobile Chrome / Safari | ✅ Touch + directional pad |

---

## Frequently Asked Questions

**Q: Why does it take a moment to load?**
The 3D building model downloads before the tour starts. A progress bar shows during loading.

**Q: Can I use this on my phone?**
Yes — touch controls, pinch-to-zoom, and an on-screen directional pad all work.

**Q: The building looks like a plain grey box.**
Place your `office-building.glb` in `public/models/` — the real model will appear.

**Q: How do I change floor names, prices, or availability?**
Edit `src/data/floors.js`. Each floor has `name`, `price`, `status`, `area`, `blurb`, and `amen` fields.

**Q: How do I update the contact form endpoint?**
Replace `APPS_SCRIPT_URL` in `src/components/ui/ContactPage.jsx` with your deployed Apps Script URL.

---

## Licence

Provided for demonstration and portfolio purposes.

---

*Built with React 18, Three.js 0.169, and React Three Fiber · Mumbai Tower, BKC, Mumbai 400051*
