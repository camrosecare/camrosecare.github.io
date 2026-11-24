# Camrose Little Angels Daycare Society

Official React + Vite + TypeScript website for **Camrose Little Angels Daycare Society** (`4907 47 Street, Camrose, AB, T4V 1J9`).

## Quick Start (VS Code / Local)

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build & Verify

```bash
npm run lint    # TypeScript type-check (tsc --noEmit)
npm run build   # Regenerates export ZIP and builds production bundle into dist/
npm run preview # Preview the production build locally
```

To regenerate only the downloadable project ZIP (`public/camrose_care_concept_a_audit_package.zip`):

```bash
npm run export:zip
```

## Project Structure

- `index.html` — Vite HTML entry point and Schema.org metadata
- `src/main.tsx` — React application bootstrap
- `src/App.tsx` — Main showcase shell and lazy-loaded modals/concepts
- `src/components/` — Hero, 3D Art Gallery, Reggio Emilia Philosophy, Daily Life & $50/mo School Bus tab, Why Choose Us Carousel (including Indoor Gym for Kids), Parent Resources Hub, Interactive FAQs, Contact & Map Hub, and Ask Little Angels Assistant
- `src/data/` — Daycare business details, programs, audio tracks, and chatbot knowledge base
- `public/` — Static media (`.webp`, `.mp3`), Parent Handbook PDF, overview markdown, and generated project ZIP
- `scripts/export-zip.mjs` — Packages the live React/Vite source and active assets into `public/camrose_care_concept_a_audit_package.zip`
