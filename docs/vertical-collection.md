# Vertical cartridge collection

Updated September 9, 2026. The collection changes from a multi-column grid to one vertical stack, keeping every project name and summary visible beside its cartridge.

## Interaction

- The normal page scrollbar, mouse wheel, touch pan, and page navigation drive the stack. There is no nested scroller, scroll capture, or additional selection click before opening a project.
- The cartridge nearest the viewport center lifts forward. The DOM layout stays fixed, and only its transform, shadow, and small selection marker change.
- A passive scroll listener schedules at most one pending animation frame and changes selection only when a different cartridge becomes nearest.
- Keyboard focus brings a cartridge forward. Focus navigation uses immediate scrolling so it does not travel slowly through other selections.
- Native dialogs, project hash URLs, previous/next, Escape, and return focus retain their existing behavior.
- Reduced motion keeps cartridge transforms static and removes active effects. Project labels remain readable without JavaScript.
- The footer link to `/bapos/` is labeled **My OS**.

The stack was interpreted as an overlapping arrangement. The supplied Threads reference still showed a sign-in overlay during the revisit, so the full reference animation was not verified or copied.

## Actual app icons

Verified Converty and UMAMI icons replace their decorative illustrations on the cartridge labels and in the dialogs. They are small local WebP assets with content hashes, explicit dimensions, and native lazy loading for lower entries.
See [app icon provenance](app-icons.md) for sources and the three remaining icon gaps. Existing illustrations for Short Transcript, Void Mail, and Retro Cam are retained pending their actual assets; they are not represented as app icons.

## Verification

The production build passes TypeScript, both Vite entries, and prerendering.
Desktop and mobile stack visuals were inspected in Chrome. Forty-two browser assertions pass, covering:

- A single vertical order, no horizontal overflow, and non-overlapping descriptions at 320, 390, 768, 1024, 1200, and 1440 CSS pixels.
- Scroll-driven selection and unobstructed project-name targets across those widths.
- Actual touch input at 320px and mouse clicks at 1440px opening all five correct project dialogs.
- Both real icon assets loading at 256px in their respective dialogs.
- Native Tab focus, interruption by reduced motion, static transforms while scrolling with reduced motion, and readable prerendered labels without JavaScript.
- No browser console errors.

A focus check initially used programmatic focus after pointer input, which does not reproduce keyboard modality. The final check uses actual Tab key events. The implementation also prevents smooth keyboard focus scrolling from selecting a neighboring cartridge during transit.
The footer label change was verified in the rebuilt HTML after these interaction checks.

The complete initial HTML, JavaScript, CSS, favicon, and both icon assets total 73,430 bytes with gzip in this build. No runtime dependency was added, and the original BapOS JavaScript, CSS, and shared content asset hashes are unchanged.

Lighthouse 12.8.2 audited the production preview with default simulated mobile conditions at `2026-09-09T04:38:26.072Z`. Performance, accessibility, best practices, and SEO each scored 100. First contentful paint was 1.2s, largest contentful paint 1.5s, total blocking time 0ms, and cumulative layout shift 0. These are synthetic lab measurements, not visitor field data.
