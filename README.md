# PortfolioOS — a vintage OS-simulator portfolio

A Windows-98-style desktop as a personal portfolio. Draggable windows for
**About Me**, **Projects**, **Résumé**, and **Contact**, with a Start menu,
taskbar clock, cascade, and fullscreen. Static site — no backend.

The window manager (store, Window, Desktop, Taskbar, win98 CSS) is shared with
the sibling project `bapsos-hermes` (an agent control surface); this repo strips
the agent plumbing and swaps in portfolio content windows.

## Make it yours

**Edit `src/content.ts`** — that's the only file you need to touch. It holds your
name, bio, projects, résumé, and links, all marked with `TODO`. Optionally:

- Drop an avatar image in `public/` and set `PROFILE.avatar = "/avatar.png"`.
- Drop `public/resume.pdf` and set `RESUME_PDF = "/resume.pdf"` for a real download.

Add or remove windows in `src/apps/registry.ts`.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the built site locally
```

## Deploy (Vercel)

The repo is Vercel-ready (`vercel.json`: Vite framework, `dist` output, SPA
rewrite). Either:

- **Dashboard:** import the Git repo at vercel.com → it auto-detects Vite → Deploy.
- **CLI:** `npm i -g vercel && vercel` (then `vercel --prod`).

## Architecture

| File | Role |
| --- | --- |
| `src/content.ts` | **All portfolio content** — edit this. |
| `src/main.tsx` | Mounts `<Desktop>` to `#root` (standalone React). |
| `src/Desktop.tsx` | Desktop surface: icons + windows + taskbar. |
| `src/Window.tsx` | Draggable win98 window frame (active/inactive). |
| `src/Taskbar.tsx` | Start menu, task buttons, cascade, fullscreen, clock. |
| `src/store.ts` | Zustand window-manager store (persisted to localStorage). |
| `src/apps/registry.ts` | The installed "programs" (launchers). |
| `src/apps/*` | Window bodies: AboutMe, Projects, Resume, Contact. |
