# Dinuka Ekanayake — Portfolio

A modern, production-grade personal portfolio built with **React 18**, **TypeScript**, **Vite**, **Framer Motion**, and **Tailwind CSS v4**.

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | React 18 + TypeScript               |
| Build tool   | Vite 5                              |
| Styling      | Tailwind CSS v4 + CSS custom props  |
| Animation    | Framer Motion 11                    |
| 3D / Canvas  | Three.js (particle field via Canvas API) |
| Fonts        | Syne (display) + DM Mono (mono)     |
| Deployment   | Vercel (recommended)                |

---

## Folder Structure

```
portfolio-new/
├── index.html                  # Entry HTML, meta tags, favicon
├── vite.config.ts              # Vite + Tailwind CSS v4 plugin
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
└── src/
    ├── main.tsx                # React root
    ├── App.tsx                 # Layout: all sections assembled
    ├── index.css               # Tailwind + fonts + CSS variables
    ├── data/
    │   └── portfolio.ts        # ← ALL your content lives here
    ├── hooks/
    │   └── useScrollReveal.ts  # Scroll animation hook + variants
    └── components/
        ├── Cursor.tsx          # Custom magnetic cursor
        ├── Navbar.tsx          # Sticky nav with active section tracking
        ├── Hero.tsx            # Full-screen hero with animated name
        ├── ParticleField.tsx   # Canvas particle constellation
        ├── Marquee.tsx         # Scrolling ticker strip
        ├── SectionLabel.tsx    # Numbered section header
        ├── About.tsx           # Bio, stats, skill pills
        ├── Projects.tsx        # Project cards grid
        ├── Experience.tsx      # Timeline + volunteer callout
        ├── Contact.tsx         # CTA with email + social links
        └── Footer.tsx          # Footer
```

---

## Quick Start

### 1. Install dependencies

```bash
cd portfolio-new
npm install
```

### 2. Start dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production

```bash
npm run build
npm run preview   # preview production build locally
```

---

## Customisation

### Updating your content

**Everything is in one file:** `src/data/portfolio.ts`

- `personalInfo` — name, email, GitHub, LinkedIn, tagline
- `skills` — grouped skill categories and items
- `projects` — title, description, tags, category, year
- `experience` — work + education entries
- `stats` — the four headline numbers in About

### Changing colours

Edit the CSS custom properties at the top of `src/index.css`:

```css
:root {
  --bg:      #f5f2ee;   /* page background */
  --fg:      #0e0e0e;   /* primary text */
  --accent:  #c84b2f;   /* burnt orange highlight */
  --accent2: #1a3a5c;   /* secondary accent (unused by default) */
  --muted:   #7a7570;   /* secondary text */
  --card-bg: #ffffff;   /* card backgrounds */
}
```

Dark mode values are in the `@media (prefers-color-scheme: dark)` block below.

### Adding a project

In `src/data/portfolio.ts`, add an object to the `projects` array:

```ts
{
  id: '05',
  featured: false,
  title: 'Your Project Title',
  description: 'What it does and how you built it.',
  tags: ['React', 'Node.js'],
  category: 'Web',
  year: '2025',
}
```

### Adding your CV PDF

Place your CV at `public/CV__Dinuka_Ekanayake.pdf`.  
The Navbar "Resume ↗" button links to `/CV__Dinuka_Ekanayake.pdf` automatically.

---

## Deployment to Vercel

```bash
# Install Vercel CLI (once)
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo on [vercel.com](https://vercel.com) and every push to `main` auto-deploys.

**Vercel settings** (auto-detected):
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

---

## Design Decisions

- **Editorial Brutalism** — large typography, raw grid, confident whitespace
- **Syne** — an unusual display typeface that gives a distinctive identity
- **DM Mono** — monospace for labels and body copy; adds technical texture
- **Particle field** — custom Canvas 2D (no Three.js dependency needed for 2D); mouse-repellent particles with connection lines
- **Framer Motion** — scroll-triggered `useInView` reveals on every section
- **CSS variables only** — no Tailwind colours in JS; all theming via `var(--*)` for instant dark mode
- **`cursor: none`** + custom cursor — magnetic ring + dot with `mix-blend-mode: difference`

---

## Next Steps (optional enhancements)

- [ ] Add a **Three.js 3D globe** or rotating mesh to the hero
- [ ] Add **project detail pages** with React Router
- [ ] Add a **light/dark toggle** button
- [ ] Add a **contact form** with EmailJS or Resend
- [ ] Add **OG image** for social sharing (`og:image` meta tag)
- [ ] Add **Google Analytics** or Plausible for visitor tracking
