# VELORA — Luxury Fashion Showroom

> **"WEAR THE MOMENT."**  
> An immersive, editorial digital showroom and contemporary Indian atelier collection designed for modern luxury fashion.

[![Built with React](https://img.shields.io/badge/React-19.0-black?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-dfccad?style=flat-square)](#)

---

## Overview

**VELORA** combines high-fashion editorial aesthetics with real-time 3D interactive web graphics. Engineered with a dark luxury palette (`#0c0c0e`, `#121217`, `#dfccad`), fluid page transitions, persistent client-side atelier cart & wishlist state, and resilient WebGL fallback rendering.

### Key Features
- **3D Sculptural Hero**: Real-time Three.js kinetic atelier drape mesh with dynamic studio lighting, orbiting celestial halos, floating champagne particles, and responsive cursor parallax.
- **Interactive 3D Showroom**: Full 360° rotunda gallery with interactive beacon hotspots, real-time 3D-to-2D projected product coordinates, touch drag controls, and auto-rotation toggle.
- **Full 3-Page Architecture**:
  - `/` — Atelier flagship overview, featured editorial drops, interactive 3D showroom teaser, and brand story.
  - `/collection` — Comprehensive catalog featuring category filtering (`SHIRTS`, `JACKETS`, `TROUSERS`, `ESSENTIALS`), multi-criteria sorting, and wishlist filtering.
  - `/showroom` — Dedicated 3D virtual showroom space with interactive rotunda, zone exploration, and architectural specifications.
- **White-Glove Atelier Bag & Wishlist**: Resilient storage engine with in-memory fallback, quantity updates, order confirmation simulation, and custom quick-view modal.
- **Private Salon Concierge**: Integrated reservation drawer for Jaipur Flagship atelier visits with service selection and date picking.
- **Production Hardened**: Built-in React Error Boundaries, WebGL context loss recovery, preloader timeout safeguards, and semantic HTML5 history routing with SPA redirects for Vercel and Netlify.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite`
- **3D Engine**: Three.js (r186)
- **Animations**: Motion (Framer Motion v12)
- **Iconography**: Lucide React
- **Typography**: Cormorant Garamond, Italiana & Plus Jakarta Sans

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (Node 20+ or 22+ recommended)
- npm 9+ or pnpm 8+

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/velora-showroom.git
cd velora-showroom

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
The local server will start on `http://localhost:3000`.

---

## Production Build

To test and compile the production bundle:

```bash
# Typecheck & lint
npm run lint

# Build static bundle
npm run build

# Preview production build locally
npm run preview
```
The production assets will be output to the `dist/` directory.

---

## Deployment Guide

### Deploying to Vercel

1. Push your code to a GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
3. Import your GitHub repository.
4. **Build Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

> Note: The included `vercel.json` automatically configures SPA URL rewrites and asset cache-control headers so direct routes (`/collection`, `/showroom`) load smoothly.

### Deploying to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/) and click **"Add new site" > "Import an existing project"**.
2. Connect your GitHub repository.
3. **Build settings**:
   - **Base directory**: (leave blank)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

> Note: The included `netlify.toml` and `public/_redirects` automatically route all incoming traffic (`/* -> /index.html 200`) to guarantee zero 404s on page refresh.

---

## Architecture & Stability Highlights

1. **WebGL Memory Management**: Geometries and materials are systematically disposed upon component unmount to prevent GPU leaks during repeated view changes.
2. **Context Loss Recovery**: `webglcontextlost` and `webglcontextrestored` events prevent unhandled exceptions if the browser or GPU encounters a transient interruption.
3. **Graceful Degradation**: Devices without WebGL support display a stylized luxury SVG vector silhouette and direct product cards.
4. **Storage Safety**: Cart and wishlist persistence operates via a guarded wrapper that gracefully handles blocked cookies, Private Browsing mode, and corrupted JSON payloads.

---

## Brand Identity

- **Brand**: VELORA Atelier
- **Tagline**: WEAR THE MOMENT.
- **Headquarters**: C-Scheme, Jaipur, Rajasthan 302001
