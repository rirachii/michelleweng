# MichelleOS — Design System

A vintage OS-simulator portfolio: a draggable-window desktop rendered as a personal site.
The current skin is **"the wired"** — a dark, Serial Experiments Lain-inspired reskin of a Windows-98 desktop.

This document is the single source of truth for the look and feel.
Everything below is reverse-engineered from `src/styles.css` and the app components in `src/`.
All visual tokens live in one place — the CSS custom properties on `.bapsos-root` — so retheming is a matter of changing tokens, not chasing hex codes.

---

## 1. North star

- **It is an operating system, not a web page.** Every surface is a window, a taskbar, a desktop icon, or a screen. There is no scrolling document.
- **Chunky, physical, retro.** Hard 1px/2px bevels, no border-radius, no soft shadows, no anti-aliased "smoothing" (`-webkit-font-smoothing: none`). Windows look pressed out of plastic.
- **Dark and melancholic.** Warm charcoal chrome, near-black recesses, a rust-amber accent, faint CRT scanlines and vignette. The mood is a dim dusk in "the wired."
- **Content-driven.** All portfolio copy lives in `src/content.ts`; the design never hardcodes strings.
- **Legibility beats effect.** CRT texture lives only on the wallpaper — never over window or taskbar text.

---

## 2. Tokens

All tokens are CSS custom properties declared once on `.bapsos-root` (`src/styles.css`).
Reference them with `var(--token)`; never inline a raw hex that a token already covers.

### 2.1 Color

| Token | Value | Role |
| --- | --- | --- |
| `--w98-face` | `#2b2930` | Default chrome face — windows, taskbar, buttons, tags |
| `--w98-canvas` | `#14121a` | Content panes & input fields (the old "white" areas) |
| `--w98-desktop` | `#0a0810` | Desktop base color behind the wallpaper |
| `--w98-light` | `#4f4c58` | **Bevel highlight** — top/left of raised, bottom/right of inset |
| `--w98-shadow` | `#131118` | **Bevel mid-shadow** — inset edges, hairline dividers |
| `--w98-dark` | `#050408` | **Bevel deep-shadow** — bottom/right of raised |
| `--w98-text` | `#e8e2d4` | Primary text (warm off-white) |
| `--w98-muted` | `#968f81` | Secondary/label text |
| `--w98-navy` | `#4a2016` | Active title bar start + selected-row background (dark rust) |
| `--w98-navy2` | `#8f3c1d` | Active title bar gradient end (amber-rust) |
| `--w98-accent` | `#e0913c` | Links, highlights (amber) |
| `--accent-hot` | `#c0431a` | Rust-red — the Start star, hot alerts |
| `--w98-hover` | `#262330` | Row hover background |
| `--danger` | `#e0645a` | Error text |
| `--screen-black` | `#000000` | "Screen" backgrounds — calculator display, mine counter |
| `--crt-green` | `#3fe07a` | Phosphor-green body text (terminal) |
| `--crt-green-bright` | `#dff7e6` | Bright green — prompts, echoed input, overlays |

Naming note: the `--w98-*` names are historical (the base was literal Windows-98 grey).
They are now semantic slots — `--w98-navy` is "the active/selected accent," not the color navy.

### 2.2 Type

| Token | Stack |
| --- | --- |
| `--font-ui` | `Tahoma, "MS Sans Serif", Geneva, Verdana, sans-serif` |
| `--font-mono` | `"Courier New", monospace` |

`--font-mono` is the "computer voice" — terminals, the read_me notepad, file text, calculator display, mine counter, boot screen, code-like dates.
Everything else uses `--font-ui`.

**Size scale** (px): `11` fine print · `12` labels/secondary · `13` body (default in panes) · `14` sub-headings · `15` base UI + title bar · `16` inline emoji/section · `20` résumé H1 · `22` calculator/shutdown display · `26` big emoji · `38` desktop icon glyph · `40` boot logo.
Weight is either normal or `bold` — no intermediate weights.

### 2.3 Spacing

A small, even scale in px. Prefer these over arbitrary values.

`2` hairline gaps · `4` tight · `6` · `8` default gap/padding · `10` · `12` pane padding (`.bapsos-pad`) · `14` · `16` section · `18`+ only for icon grids.

### 2.4 Sizing (fixed chrome)

| Element | Value |
| --- | --- |
| Title bar height | `26px` |
| Title bar buttons | `20 × 20px` |
| Taskbar height | `40px` |
| Desktop icon cell | `92px` wide, `38px` glyph |
| Window bevel | `2px` outer, `1px` inner panes |
| Resize grip | `16 × 16px` |

Window default sizes live per-app in `src/apps/registry.ts` (`w`/`h`).

---

## 3. The bevel system (core pattern)

The whole UI is built from two 3D border recipes. This is the single most important pattern — learn it and every component follows.

**Raised** (buttons, window frames, tags, taskbar, faces that sit "up"):

```css
border-top:    Npx solid var(--w98-light);   /* lit from top-left */
border-left:   Npx solid var(--w98-light);
border-right:  Npx solid var(--w98-dark);    /* shadowed bottom-right */
border-bottom: Npx solid var(--w98-dark);
```

**Inset** (content panes, input fields, wells — anything "pushed in"):

```css
border-top:    1px solid var(--w98-shadow);  /* shadowed top-left */
border-left:   1px solid var(--w98-shadow);
border-right:  1px solid var(--w98-light);   /* lit bottom-right */
border-bottom: 1px solid var(--w98-light);
```

**Pressed** = a raised element with the four borders swapped (light ⇄ dark). Every clickable control does this on `:active` / `.active`.

Rules of thumb:
- `N = 2px` for primary chrome (windows, taskbar, Start button, calculator keys, mine cells). `N = 1px` for inner controls and panes.
- The bevel *is* the depth cue. **Never** add `border-radius` or `box-shadow` blur to fake it.
- The only real shadow is the flat window drop `box-shadow: 1px 1px 0 var(--w98-shadow)` (hard, offset, no blur).

---

## 4. Elevation / stacking

Windows are absolutely positioned; z-index is managed in `src/store.ts` (each focus bumps a counter).

| Layer | z-index | What |
| --- | --- | --- |
| Wallpaper `::before` + vignette/scanline `::after` | `0` | Desktop background |
| Desktop icons | `1` | `.bapsos-icons` |
| Windows | `2+` | Incrementing on focus |
| Start-menu scrim | `9999` | Click-catcher behind the menu |
| Start menu | `10000` | Above windows |
| Boot splash / Shutdown | `99999` | Full-screen takeovers |

---

## 5. Components

Class prefix is `bapsos-` throughout (historical — shared lineage with the sibling `bapsos-hermes` project).

- **Window** `.bapsos-window` — raised 2px frame + `.bapsos-titlebar` + inset `.bapsos-window-body`. Draggable by the title bar; `.bapsos-resize-grip` (hatched corner) resizes; `.bapsos-window-max` fills the desktop.
- **Title bar** `.bapsos-titlebar` — active: rust→amber gradient (`--w98-navy`→`--w98-navy2`), white text. Inactive: `.bapsos-titlebar-inactive` dark-grey gradient, muted text. Buttons: minimize `_`, maximize `🗖`/restore `🗗`, close `✕`.
- **Buttons** — raised face, pressed on `:active`. Canonical helper: `.bapsos-btn`. Many components repeat the recipe inline (calculator keys, toolbar buttons) — prefer `.bapsos-btn` for new work.
- **Fields** `.bapsos-contact-input`, `.bapsos-startmenu-search` — inset bevel, `--w98-canvas` background, `--w98-text`.
- **Content pane / "canvas"** — inset bevel, `--w98-canvas` background. The dark stand-in for the old white document area (notepad, lists, résumé page, guestbook).
- **List row + selection** — `.bapsos-file-row` / `.bapsos-project-row`: hover `--w98-hover`; selected `--w98-navy` bg + white text.
- **Tag / chip** `.bapsos-tag` — tiny raised pill for tech labels.
- **Fieldset** `.bapsos-fieldset` — hairline group box with a legend (used in Contact, Guestbook).
- **Master-detail** `.bapsos-projects` — inset list on the left, inset detail pane on the right. Reused by Projects and Writing.
- **Taskbar** `.bapsos-taskbar` — raised 40px bar: Start button, task buttons (`.bapsos-taskbtn`, pressed when its window is focused), and the tray.
- **Start button** `.bapsos-start` — the one intentionally *light* control (`#e9e3d5`) so it pops on the dark bar, with a rust-red star (`--accent-hot`).
- **System tray** `.bapsos-tray` — inset well holding app count, sound, fullscreen, clock.
- **Start menu** `.bapsos-startmenu` — vertical branded rail (`MICHELLEOS`) + avatar/name header + search + program list + Cascade / Shut Down.
- **Desktop icon** `.bapsos-desktop-icon` — 38px emoji glyph + outlined white label. Labels always carry the dark text-shadow outline for legibility over any wallpaper.
- **Screen surfaces** — terminal, calculator display, mine counter, boot: `--screen-black` background, `--font-mono`, phosphor color (`--crt-green`, or the calculator's mint `#7dffb0`). These deliberately ignore the chrome palette — they are lit screens, not plastic.
- **Full-screen overlays** — `.bapsos-boot` (green CRT boot, once per session) and `.bapsos-shutdown` (amber "safe to turn off"). Both z `99999`.

---

## 6. Desktop & wallpaper

- **Wallpaper** is a separate `.bapsos-desktop::before` layer: `wallpaper.webp`, `background-size: cover`, `image-rendering: pixelated`, and `transform: scale(1.25)` (zoomed 1.25× while still fully covering). It sits at z `0` with `pointer-events: none`, so dragging never touches it. A dark gradient is the load-time fallback.
- **Mood layer** `.bapsos-desktop::after`: a radial **vignette** plus faint **CRT scanlines** (`rgba(0,0,0,0.1)` every 3px). Applied only here — behind icons and windows — so UI text stays crisp.
- **Icon grid** `.bapsos-icons`: `display:grid; grid-auto-flow:column; grid-template-rows: repeat(4, auto)` — a left-anchored, column-major grid (fills top-to-bottom, then wraps right), like a classic desktop.

To swap the wallpaper: replace `public/wallpaper.webp` (keep it a wide pixel-art image; export as webp ~90 quality) — no code change needed.

---

## 7. Motion

Motion is minimal and retro — steps and linear fades, never springy easing.

- `bapsos-blink` — 1s `steps(1)` opacity blink (cursor, boot tagline, "thinking").
- `bapsos-boot-fill` — 1.9s ease-out progress bar on the boot splash.
- Boot fade-out — `opacity 0.45s ease`.

No hover-grow, no parallax, no transitions on the chrome itself (win98 controls snap, they don't animate).

---

## 8. Voice & content

- **lowercase, terminal-flavored.** read_me and the terminal speak in lowercase, first person ("hi, i'm michelle :)").
- **"the wired" references** are welcome and on-brand: `cloud_surfing…`, `michelle@wired:~$`, `MICHELLE_OS`, the boot tagline.
- **Plain dash `-`, never the em dash `—`** in authored copy.
- Program names read like apps/executables (Terminal, read_me.txt, Guestbook).

---

## 9. Extending the system

**Add a new "program":**
1. Create the component in `src/apps/` using the classes above (reuse `.bapsos-pad`, `.bapsos-fieldset`, `.bapsos-btn`, the master-detail or notepad shells).
2. Register it in `src/apps/registry.ts` (`id`, `title`, emoji `icon`, `w`/`h`, `onDesktop`).
3. Put any copy in `src/content.ts` — never hardcode strings in the component.

**Retheme:** edit only the token block on `.bapsos-root`. The bevel system re-derives all depth from `--w98-light` / `--w98-shadow` / `--w98-dark`, so keeping *light lighter than face* and *dark darker than face* is all a new palette must respect.

---

## 10. Cleanup backlog (known deviations)

Small spots that predate the dark theme and don't yet fully honor the tokens:

- `.bapsos-calc-btn.op` (`#d3d8ee`) and `.fn` (`#eeded3`) — pastel operator/function keys left over from the light theme. Currently read as light accents; retint toward the amber/rust palette if a fully-uniform calculator is wanted.
- `.bapsos-chat-user b` / `.bapsos-chat-agent b` (`#000080` / `#006000`) — dark blue/green from the old light theme. Not visible today (the Chat app isn't registered), but should move to light/accent colors if it's ever shipped.
- A few controls (calculator keys, toolbar buttons) inline the raised-bevel recipe instead of using `.bapsos-btn`; consolidating them onto the helper would shrink the CSS.
