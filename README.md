# Michelle Weng - cartridge portfolio

A lightweight, responsive portfolio built with React, TypeScript, and Vite.
The main page presents projects as original Game Boy-inspired cartridges, with accessible project dialogs, writing, an about section, and direct contact links.
The complete page is prerendered at build time, then hydrated for interaction.
There are no external fonts, video backgrounds, rendering libraries, analytics, or runtime APIs.

The original BapOS desktop remains available at **`/bapos/`**, with its original components, styling, games, wallpaper, and local storage key.
Its JavaScript and CSS are separate build entries and are not loaded by the new portfolio.

## Develop and verify

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5184 --strictPort
npm run build
npm run preview -- --host 127.0.0.1 --port 4184 --strictPort
```

`npm run build` runs TypeScript checks, builds both HTML entries, and prerenders the new portfolio into `dist/index.html`.
The preview server serves the production artifacts.
`npm run typecheck` runs the TypeScript check independently.

Check the new page at 320px, 390px, 768px, and 1440px widths.
Open every cartridge, navigate between projects, press Escape, use browser Back, and reload a direct project hash.
Check that focus returns to the opening cartridge, dialogs scroll at small heights, email copy reports success or failure, and the original `/bapos/` entry still loads.
Respect reduced motion and verify that the main page never requests the archive bundle or wallpaper.
Switch reduced motion on during a dialog transition and a scroll reveal; both must stop immediately.
Close and reopen a dialog quickly, then check next/previous focus and the return to its opening cartridge.
See `docs/motion-review.md` for the motion review, measured payload, and browser checks.

## Content and design

- `src/content.ts`: original profile, project descriptions, writing summaries, résumé, and contact links, shared with the archive.
- `src/portfolio.tsx`: page composition, cartridge presentation metadata, and interactions.
  If the project collection changes, update `EDITIONS` alongside `PROJECTS` in the same order and update the displayed collection count.
- `src/portfolio.css`: responsive layouts, CSS cartridge artwork, and focus styles.
- `src/motion.css`: finite cartridge and label animations, dialog transitions, interaction feedback, and reduced-motion overrides.
- `src/usePortfolioMotion.ts`: progressive scroll reveals, fine-pointer tilt, and cancellable detail-copy animation.
- `DESIGN.md`: current portfolio design and accessibility contract.
- `docs/BAPOS-DESIGN.md`: preserved design system for the original desktop.
- `src/main.tsx`: new page hydration in production and mounting in development.
- `scripts/prerender.mjs`: build-time HTML rendering through Vite and React.
- `bapos/index.html` and `src/bapos-main.tsx`: isolated original desktop entry.

Existing projects have descriptions but no verified project URLs.
Their detail views therefore offer an email link to ask about the project.
Add a real `link` and optional `linkLabel` in `src/content.ts` to enable a direct project link.
The existing résumé downloads as Markdown until `RESUME_PDF` points to a real PDF in `public/`.

## Preservation

The exact pre-redesign source is commit `a98e05e6fccd2948a436f9c7911840ff84829ebf`, named by branch `archive/bapos-os-2026-09-08`.
The redesign is developed on `feat/gameboy-portfolio`.

The `origin` remote is `rirachii/bapsos-portfolio`.
The `michelleweng` remote is `rirachii/michelleweng`, which supplies the existing Vercel portfolio project.
Do not treat these two remotes as interchangeable or overwrite the archived branch.

## Deploy

The existing Vercel project is `michelleweng` in `rirachiis-projects`.
Its portfolio domain is `www.wengmichelle.com`.
`vercel.json` explicitly selects Vite, the build command, and `dist`, overriding the older Next.js project preset for this deployment.
It also routes `/bapos` and `/bapos/` to the separate archive entry and gives fingerprinted assets immutable caching.

```sh
vercel link --yes --project michelleweng --scope rirachiis-projects
vercel deploy --yes
# Publish after reviewing the production build:
vercel deploy --prod --yes
```

Linking can create local Vercel metadata and an environment file; both are ignored by Git.
Never commit environment values.
See `docs/cartridge-release.md` for the verified release state and rollback reference.
