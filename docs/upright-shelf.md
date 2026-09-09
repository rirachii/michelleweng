# Upright cartridge shelf

Updated September 9, 2026. This replaces the earlier vertical stack while preserving the original OS at `/bapos/` and its **My OS** footer link.

## Reference and rendering investigation

The user supplied [this Threads share](https://www.threads.com/share/HZHcvZIBn/), which resolves to Mamuso's [mobile portfolio clip](https://www.threads.com/@mamuso/post/DdCI33ACK5U). It opened publicly during this review. The 19-second video was inspected at rest and at several selected states.

Observed principles:

- A short personal introduction above a compact row of upright cartridges.
- Side faces and thickness make the resting cartridges feel stored on a shelf.
- Selection separates a cartridge from its neighbors and turns its front toward the visitor.
- A small caption under the selected object preserves the visual focus.

The portfolio adapts those interaction principles to its own Game Boy shapes, Michelle's content, existing label illustrations, and verified app icons. No reference video, copied texture, game cover, or source code is shipped.

The user also suggested [vgpu](https://vgpu.sh/). Its [official repository](https://github.com/vercel-labs/vgpu) describes a TypeScript WebGPU library with WGSL shader imports, explicit render passes, browser/headless rendering, and agent tooling. The README reports a 25 KB gzip budget for a complete fullscreen effect; that is not a measurement of this portfolio or a full cartridge scene.

Mamuso's [reply about the mobile clip](https://www.threads.com/@mamuso/post/DdC0rhXDwK8) identifies Three.js. No evidence was found that this specific portfolio used vgpu. His public `mamuso/mamuso.net` repository last showed a 2024 push and a Jekyll structure, so it was not treated as the source of the new demo.

This implementation uses CSS 3D faces. The shelf needs finite object rotations and translations, without custom shaders, dynamic lighting, or a continuously rendered scene. The existing labels remain DOM content, and there is no canvas, WebGPU requirement, graphics runtime, or new dependency. Revisit that choice only if a future visual requirement calls for actual shader or scene rendering.

## Interaction contract

`src/CartridgeShelf.tsx` owns selection and gestures. `src/collection.css` owns the page refinement, shelf geometry, shell faces, captions, and responsive states.

- All five cartridges are visible at rest. A click/tap or keyboard focus selects one. View project opens its native dialog.
- Left/right arrow controls wrap. Keyboard Left/Right, Home, and End move selection and focus among the cartridge buttons.
- Horizontal touch swipes select one neighbor after a 40px gesture. Vertical touch panning retains native document scrolling. A swipe cannot turn into an accidental click.
- Small horizontal trackpad deltas accumulate into a browsing step. Vertical wheel events do not change selection.
- Fine-pointer hover tilts the artwork without changing selection or moving the button's target.
- The All projects disclosure provides a conventional list with every name, summary, and direct dialog action. It is present in prerendered HTML.
- Each button has a clear project name and `aria-pressed` state. Decorative 3D faces are siblings of the button so their miniature printed lettering does not pollute its visible-text/accessibility-name comparison.
- Captions are announced politely after selection, and a reserved caption/action area keeps the controls steady.
- Reduced motion makes selection immediate and cancels existing effects. There is no automatic or perpetual shelf animation.
- Existing dialog hashes, previous/next controls, Escape, and focus return are preserved. Dialog focus returns to the View project or project-list button that opened it.

The original app icon provenance and three missing sources remain documented in [app-icons.md](app-icons.md).

## Verification

The production build includes TypeScript, both Vite entries, and prerendering. The responsive browser checks cover 320, 390, 768, and 1440 CSS pixels, actual touch and mouse input, swipes and native vertical panning, trackpad deltas, keyboard browsing, dialogs, focus return, reduced motion, direct project hashes, icon loading, and prerendered project text. Desktop and mobile idle/selected shelf states are also inspected visually.

Initial keyboard automation omitted Enter's character event. Actual browser keyboard operation passed; the harness was corrected to dispatch Enter's native character as well as keydown/keyup.

The final build passes all 69 browser assertions with no browser errors. The complete initial HTML, JavaScript, CSS, favicon, and both icons total 75,101 bytes gzip. The BapOS JavaScript, CSS, and shared content hashes are unchanged.

Lighthouse 12.8.2 audited the final production preview at `2026-09-09T05:06:46.473Z` using default simulated mobile conditions. Performance, accessibility, best practices, and SEO each scored 100. FCP was 1.2s, LCP 1.5s, total blocking time 0ms, and cumulative layout shift 0. No accessibility audit failed, including the decorative-label naming check, and there were no run warnings. These are local synthetic lab measurements, not field data from visitors.
