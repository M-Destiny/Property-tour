# Peachtree Tower — Interactive 3D Property Tour

> A fully interactive, browser-based 3D walkthrough of a mixed-use high-rise in Atlanta, Georgia. No app to download. No VR headset required. Just open it in any modern browser and explore.

---

## What Is This?

Imagine being able to walk through an apartment, office, or penthouse before it's even built — from anywhere in the world, on any device. That's exactly what this is.

**Peachtree Tower** is a real estate presentation tool that puts a full 14-floor building in your browser. You can orbit around the exterior, click any floor to step inside, walk around the rooms, check the floor plan, and toggle between day, dusk, and night lighting — all in real time, all in 3D.

Think of it like Google Street View, but for a building that lives entirely in your browser.

---

## What Can You Do In The Tour?

### On the Outside (Exterior View)
- **Rotate** the building by clicking and dragging with your mouse
- **Zoom** in and out by scrolling your mouse wheel (or pinching on a touchscreen)
- **Click any floor band** on the building to fly inside that level
- Use the **floor navigator panel** on the right to jump directly to any of the 14 floors

### Once You're Inside a Floor
There are **two modes** you can switch between:

#### 1. Spots Mode (default)
Five hand-picked viewpoints are placed throughout the room — for example, the Kitchen, Living Room, Primary Bedroom, etc.
- Click any **spot card** along the bottom of the screen to teleport to that viewpoint
- Use **keyboard keys 1 through 5** to jump instantly to a spot
- Use the **← → arrow keys** to cycle through spots one by one
- **Drag** your mouse to look around from wherever you're standing
- **Floating labels** appear in 3D space showing you where each room is — click them to go there

#### 2. Free Roam Mode
Full first-person walking — like a video game:
- **W / A / S / D** keys (or arrow keys) to walk forward, left, backward, right
- **Drag** your mouse to look around
- On touch devices, use the **on-screen directional pad**

### Other Controls
| Button | What It Does |
|--------|-------------|
| **Floor Plan** | Opens a detailed architectural drawing of the current floor |
| **Back (◀)** | Exits the floor and returns to the exterior orbit view |
| **Next ↑** | Goes up to the next floor without going back to the exterior |
| **Spots / Free Roam** | Toggles your movement mode |
| **☀ Day / 🌅 Dusk / 🌙 Night** | Changes the time of day — affects sky, lighting, and building window glow |
| **Fullscreen button** (bottom-right) | Expands the tour to fill your entire screen |

### Floor Plan — Live Location Dot
When the floor plan drawer is open and you're inside a floor, a **gold dot with a direction arrow** shows your exact position on the architectural drawing — and it updates in real time as you move or look around.

### Compass
A rotating compass needle appears in the top-right when you're inside, showing which direction you're facing at all times.

---

## The Building — 14 Floors

| Floor | Name | Type | Key Features |
|-------|------|------|-------------|
| L | Lobby & Arrival | Public / Reception | Double-height hall, concierge, art wall, EV drop-off |
| 02 | Retail Galleria | Retail | Flexible bays, storefront glazing, high footfall |
| 03 | Café & Co-work | Hospitality | Roastery café, hot desks, phone rooms, Wi-Fi 7 |
| 04–08 | Corporate Suites | Office | Column-free open studio, glazed boardroom, skyline views |
| 09–12 | Residences | Residential | 2-bed apartments, chef kitchen, walk-in wardrobe, balcony |
| 13 | Sky Lounge | Amenities | Cocktail bar, fitness suite, screening room, sky terrace |
| 14 | The Penthouse | Residential | 3-bed full-floor, great room, wine room, 360° wrap terrace |

Each floor has its own **five preset viewpoints** tailored to its use — offices have Reception, Boardroom, and Open Studio; residences have Kitchen, Living Room, and Bedrooms.

---

## Features At A Glance

- **Real-time 3D rendering** — the building is rendered entirely in your browser using WebGL (the same technology that powers 3D video games in browsers)
- **Day / Dusk / Night** — three atmospheric presets that change the sky gradient, sun angle and colour, building window brightness, and environment lighting all at once
- **Enclosed rooms** — proper ceiling, walls, and floor surfaces inside every unit so you never see "through" the building
- **Interior lighting** — warm recessed ceiling fixtures illuminate the room from inside; intensity increases at dusk and night
- **Clickable 3D hotspot pins** — floating room labels in 3D space that you can click to teleport
- **Live compass** — always know which direction you're facing
- **Live floor plan dot** — see yourself on the architectural drawing in real time
- **Keyboard shortcuts** — 1–5 to jump to spots, ← → to cycle, W/A/S/D to walk
- **Smooth camera transitions** — animated fly-in when entering a floor, smooth tween when jumping between spots
- **Loading screen** — a clean progress indicator while the 3D models load
- **Fullscreen mode** — one click to fill the whole screen
- **Touch support** — works on phones and tablets with pinch-to-zoom and an on-screen directional pad
- **High performance** — building windows use GPU instancing (one draw call for hundreds of panes), shadow casting is selectively disabled on distant geometry, compass and floor-plan dot animate via direct DOM manipulation at 60fps without triggering React re-renders

---

## Getting Started

### What You Need
- [Node.js](https://nodejs.org/) version 18 or higher — this is a free program that lets you run the development server on your computer
- A modern browser (Chrome, Edge, Firefox, or Safari — all from 2022 or later)
- The project files (this repository)

### Step 1 — Install dependencies
Open a terminal (Command Prompt on Windows, Terminal on Mac) in the project folder and run:

```bash
npm install
```

This downloads all the code libraries the project needs. It only needs to be done once. You'll see a `node_modules` folder appear — that's normal.

### Step 2 — Start the development server
```bash
npm run dev
```

You'll see output like:
```
  VITE v5.x.x  ready in 400 ms
  ➜  Local:   http://localhost:5173/
```

### Step 3 — Open in your browser
Go to **http://localhost:5173** in your browser. The tour will load.

### Step 4 — Build for production (optional)
If you want to deploy this to a website:
```bash
npm run build
```

This creates a `dist/` folder with optimised files ready to upload to any web host (Netlify, Vercel, GitHub Pages, etc.).

---

## 3D Models

The tour expects two `.glb` (3D model) files in the `public/models/` folder:

| File | Description |
|------|-------------|
| `public/models/office-building.glb` | The main exterior building model, scaled to 100 world units tall |
| `public/models/apartment.glb` | The interior apartment/floor unit model |

If these files are missing, the app falls back to a procedurally generated building so you can still see the tour structure.

---

## Project Structure

```
peachtree-tour/
│
├── public/
│   └── models/              ← 3D model files go here (.glb)
│
├── src/
│   ├── App.jsx              ← Main app: state, UI layout, loading screen, fullscreen
│   ├── styles.css           ← All visual styling
│   │
│   ├── components/
│   │   ├── Experience.jsx        ← 3D scene root: lighting, time of day, scene assembly
│   │   ├── TourController.jsx    ← All camera movement: orbit, fly-in, free roam, spot tween
│   │   ├── SceneEnv.jsx          ← Exterior: sky dome, ground, roads, neighbour buildings, trees
│   │   ├── OfficeBuilding.jsx    ← Loads the main building GLB; fades out when you go inside
│   │   ├── Building.jsx          ← Procedural fallback building (shown while GLB loads)
│   │   ├── FloorUnit.jsx         ← Loads the interior apartment GLB onto the selected floor
│   │   ├── RoomShell.jsx         ← Ceiling, walls, floor surface, and interior lights
│   │   ├── RoomHotspots.jsx      ← Floating 3D room labels (clickable)
│   │   ├── Floor.jsx             ← Clickable/hoverable floor band overlays on the exterior
│   │   ├── useCenteredGLTF.js    ← Helper: loads a GLB, centres it, optionally scales it
│   │   ├── tourInput.js          ← Shared touch-pad input state
│   │   └── ui/
│   │       ├── Brand.jsx         ← Logo and building stats in the top bar
│   │       ├── FloorNav.jsx      ← Floor selector panel (right side)
│   │       ├── FloorDrawer.jsx   ← Slide-out floor plan + live location dot
│   │       └── WalkPad.jsx       ← On-screen directional pad (touch devices)
│   │
│   └── data/
│       ├── floors.js        ← All 14 floor definitions (name, area, beds, blurb, amenities)
│       ├── plans.js         ← SVG architectural floor plan drawings
│       └── spots.js         ← 5 preset viewpoints per floor plan type, with descriptions
│
├── index.html               ← HTML entry point
├── vite.config.js           ← Build tool configuration
└── package.json             ← Project metadata and dependency list
```

---

## Technology Stack

| Technology | What It Does | Why It Was Used |
|-----------|-------------|----------------|
| **React 18** | User interface framework | Manages all the buttons, panels, and state (which floor is selected, what mode you're in, etc.) |
| **Three.js** | 3D rendering engine | Does all the actual 3D graphics — geometry, lighting, cameras, shadows |
| **React Three Fiber** | Bridge between React and Three.js | Lets us write 3D scenes in the same way we write UI components |
| **@react-three/drei** | Three.js helpers | Provides ready-made components like Environment (HDRI lighting), Html (3D labels), useGLTF (model loading), useProgress (loading bar) |
| **Vite** | Build tool / dev server | Fast development server with hot-reload; bundles everything for production |
| **WebGL** | Browser GPU API | The low-level graphics API that Three.js uses to draw on your screen |
| **HDRI Lighting** | Image-Based Lighting | Real-world light probes (city, sunset, night) that make materials reflect realistic light |

---

## How The Camera Works (For The Curious)

The camera has four states that transition smoothly between each other:

1. **Orbit** — you're outside the building, dragging to rotate and scrolling to zoom. The camera orbits a fixed point at the centre of the building.
2. **Flying in** — triggered when you click a floor. The camera smoothly interpolates from its current orbit position to a first-person position inside the selected floor over 1.5 seconds.
3. **Interior** — you're inside. The camera sits at eye height above the floor. In Spots mode it teleports between preset positions with a 0.65-second smooth tween. In Free Roam it responds to keyboard/touch input every frame.
4. **Flying out** — triggered when you press "Back". Reverses back to the orbit position over 1.2 seconds.

All transitions use a **cubic ease-in-out** curve so movement feels natural rather than robotic.

---

## Performance Notes

The scene is optimised for smooth performance in a browser:

- **Building windows** — instead of creating hundreds of individual window panes as separate objects, all windows across all neighbour buildings are rendered as a single **instanced mesh** (one GPU draw call for all of them)
- **Shadow casting** — only the main building and close objects cast shadows; distant neighbour buildings do not, saving significant GPU time
- **Sky dome** — uses a low-polygon sphere since detail is imperceptible at that scale
- **Interior materials** — ceiling, wall, and floor geometry in rooms share static material objects so nothing is recreated on each render
- **Compass and floor-plan dot** — updated using `requestAnimationFrame` directly on DOM elements, bypassing React's rendering system entirely for smooth 60fps animation

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 100+ | ✅ Full support |
| Edge 100+ | ✅ Full support |
| Firefox 100+ | ✅ Full support |
| Safari 15.4+ | ✅ Full support |
| Mobile Chrome / Safari | ✅ Touch controls + directional pad |

WebGL 2.0 is required. All browsers listed above support it by default since 2022.

---

## Frequently Asked Questions

**Q: Why does it take a moment to load?**
A: The 3D building model needs to download and be processed by the browser before the tour can start. A loading screen with a progress bar shows during this time.

**Q: Can I use this on my phone?**
A: Yes. The layout adapts for smaller screens, the on-screen directional pad appears for walking, and pinch-to-zoom works for the exterior view.

**Q: The building looks like a plain grey box.**
A: The `.glb` model files are not included in this repository (they're large binary files). Place your `office-building.glb` in `public/models/` and the real model will appear.

**Q: Can I add my own building?**
A: Yes — replace `public/models/office-building.glb` with your own model. The tour will automatically centre and scale it. You may need to adjust `MODEL_HEIGHT` in `src/data/floors.js` if the proportions look off.

**Q: How do I change the floor names, areas, or descriptions?**
A: Edit `src/data/floors.js`. Each floor is a plain JavaScript object with properties like `name`, `area`, `blurb`, and `amen` (amenities list). No deep coding knowledge needed.

**Q: How do I change the preset viewpoint positions?**
A: Edit `src/data/spots.js`. Each spot has `x` and `z` coordinates (horizontal position in the room) and `yaw` (which direction the camera faces, in radians).

---

## Licence

This project is provided for demonstration and portfolio purposes.

---

*Built with React 18, Three.js 0.169, and React Three Fiber.*
