<div align="center">

# SPYLT — Animated Landing Page Clone

A pixel-perfect, animation-rich frontend clone of [SPYLT.com](https://spylt.com) — a premium protein milk brand.
Built to push the limits of scroll-based animation, motion design, and modern React architecture.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-1F3864?style=for-the-badge&logo=vercel)](https://spylt-red.vercel.app/)
&nbsp;
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
&nbsp;
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge)](https://gsap.com/)
&nbsp;
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
&nbsp;
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

</div>

---

## Overview

SPYLT is a fully animated, production-grade landing page clone built from scratch with React 19 and GSAP 3.15. Every section features hand-crafted animations — from character-level text splitting and clip-path reveals to pinned horizontal scrolling, video-driven interactions, and a scroll-expanding circular video player.

This project was built as a deep-dive into advanced frontend motion design — focusing on performance, smooth 60fps animations, mobile Safari compatibility, and proper GSAP lifecycle management inside React.

---

## ⚡ Animations & Interactions

This is where the project goes deep. Every animation was hand-crafted using GSAP primitives:

**Hero Section**
- Character-by-character title reveal using `SplitText` with `yPercent: 200` stagger entrance
- Clip-path slide-in for subtitle ("Protein + Caffeine") from left
- Scroll-triggered hero tilt: the entire section rotates and scales out as you scroll away (`scrub: 1`, `rotate: 7`, `scale: 0.9`)
- Gooey liquid drip effect on CTA button using SVG `feGaussianBlur` + `feColorMatrix` filter with staggered CSS transitions

**Message Section**
- Word-by-word text color animation (dark → cream) scrubbed to scroll position using `SplitText` with `type: "words"`
- Clip-path reveal for the highlighted "Fuel Up" badge
- Paragraph words fly in with `yPercent: 300` and a slight `rotate: 3` for a natural feel

**Flavour Section**
- Pinned horizontal scroll: the entire flavour slider moves on the X-axis while the page scrolls vertically (`pin: true`, `scrub: 1`, dynamically calculated `end` value via `getScrollAmount()`)
- Three-layer title parallax — each text row moves at different speeds (`xPercent`) creating depth

**Nutrition Section**
- Char-level stagger entrance for the main title
- Clip-path + opacity reveal for the highlight badge
- Responsive nutrient grid: shows 5 items on desktop, 3 on mobile (via `useState` + `useEffect` + `react-responsive`)

**Benefits Section**
- Four benefit titles revealed sequentially with scrubbed clip-path animations (`circ.out` easing)
- Video pin section: a circular video (`circle(9% at 50% 50%)`) expands to full screen as you scroll using `clip-path` animation

**Testimonials Section**
- Pinned section with three massive heading texts sliding in opposing horizontal directions simultaneously (`xPercent` with `"<"` position alignment)
- Seven video testimonial cards fly in from below with staggered `yPercent: 150` entrance
- Desktop: hover to play / pause each video card
- Mobile: tap to play / pause with a dedicated touch handler
- iOS Safari fix: `video.currentTime = 0.01` on `loadedmetadata` to force first-frame render

---

## 🛠️ Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 19 | UI & Component Architecture |
| GSAP | 3.15 | All Animations (ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin) |
| @gsap/react | 2.1 | `useGSAP` hook for React-safe animation lifecycle |
| Tailwind CSS | v4 | Utility-First Styling |
| Vite | 8 | Build Tool & Dev Server |
| react-responsive | 10 | Responsive breakpoint detection |

**GSAP Plugins Used:**
`ScrollTrigger` · `ScrollSmoother` · `SplitText` · `ScrollToPlugin`

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── NavBar.jsx           # Fixed navigation with scroll-to links
│   ├── BurgerMenu.jsx       # Mobile hamburger menu
│   ├── ClipPathTitle.jsx    # Reusable animated clip-path title component
│   ├── Flavourslider.jsx    # Horizontal scroll slider with pinning
│   └── Videopinsection.jsx  # Circular expanding video player
│
├── sections/
│   ├── Herosection.jsx      # Hero with SplitText + scroll tilt + gooey CTA
│   ├── Messagesection.jsx   # Word color scrub + clip-path reveal
│   ├── FlavourSection.jsx   # Pinned horizontal flavour scroll
│   ├── Nutritionsection.jsx # Animated nutrition facts + responsive grid
│   ├── Benefitsection.jsx   # Sequential clip-path benefit reveals
│   ├── Testimonialsection.jsx # Pinned video cards + parallax headings
│   └── Footersection.jsx    # Footer
│
├── constants/
│   └── index.js             # Flavour list, nutrition data, testimonial cards
│
├── App.jsx                  # Root — ScrollSmoother setup, debounced resize
└── main.jsx                 # Entry point
```

---

## ⚙️ Performance Decisions

**ScrollSmoother** — `smooth: 1.5` with `normalizeScroll: true` for consistent cross-device scrolling. `ignoreMobileResize: true` prevents address bar show/hide from triggering expensive `ScrollTrigger.refresh()` calls.

**Debounced resize** — A custom `debounce(fn, 250)` wrapper ensures `ScrollTrigger.refresh()` fires only once after the user finishes resizing, not on every event tick.

**`useGSAP` scope** — Every animation is scoped to its component's `containerRef`, so GSAP only queries DOM elements within that subtree. Prevents cross-component selector conflicts.

**`force3D: true`** — Applied globally via `defaults` on every timeline, ensuring transforms are always GPU-composited for 60fps performance.

**`willChange`** — Strategically applied to elements that animate (`transform`, `clip-path`, `opacity`, `filter`) so the browser can promote them to their own compositor layer before the animation starts.

**`fastScrollEnd: true`** — Applied to all scrubbed ScrollTriggers to immediately snap animations to their end state when the user scrolls past quickly, preventing "stuck" mid-animation states.

**Lazy video loading (Benefits section)** — `IntersectionObserver` with `rootMargin: "300px"` starts loading the pinned video 300px before it enters the viewport, eliminating buffering lag.

**SplitText cleanup** — Every `SplitText` instance is reverted in the `useGSAP` cleanup return function, restoring original DOM structure and freeing memory on unmount.

---

## 🚀 Getting Started

**Prerequisites:** Node.js v18+

```bash
# Clone the repo
git clone https://github.com/adeeelfarooq/SPYLT.git
cd SPYLT

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173`

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint check
```

---

## 📌 Key Challenges Solved

**Sections merging on scroll** — Pinned ScrollTrigger sections were overlapping incorrectly. Fixed with a `setTimeout(() => ScrollTrigger.refresh(), 1000)` after mount to let all assets render before GSAP calculates positions, plus a `window load` listener for slow networks.

**iOS Safari blank video cards** — Videos rendered as empty boxes on mobile until tapped. Root cause: iOS doesn't paint the first frame of a muted video until it has played. Fixed by setting `video.currentTime = 0.01` on `loadedmetadata`.

**Horizontal scroll end calculation** — Static pixel values for horizontal scroll caused misalignment on different screen sizes. Fixed by replacing constants with a `getScrollAmount()` function that reads `sliderRef.current.scrollWidth - window.innerWidth` dynamically, also passed as a function to `end` and `x` so `invalidateOnRefresh` recalculates it correctly.

**Memory leaks from SplitText** — Leaving split DOM nodes after component unmount caused duplicate elements on re-render. Fixed by calling `.revert()` on every SplitText instance inside `useGSAP`'s cleanup return.

---

## 🌐 Live Demo

**[https://spylt-red.vercel.app/](https://spylt-red.vercel.app/)**

---

## 👤 Author

**Adeel Farooq**

[![GitHub](https://img.shields.io/badge/GitHub-adeeelfarooq-181717?style=flat&logo=github)](https://github.com/adeeelfarooq)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-adeeelfarooq-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/adeeelfarooq)

