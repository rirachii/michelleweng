# Portfolio load performance

Measured September 9, 2026, while expanding the verified app icons to fill their cartridge labels.
These are synthetic lab measurements and a single browser navigation, not visitor field data.

## Public-site baseline

Lighthouse 12.8.2 audited `https://www.wengmichelle.com/` at `2026-09-09T19:05:49.127Z`.
It used default simulated mobile conditions: 150ms network RTT, 1,638.4Kbps throughput, and 4x CPU slowdown.

| Measurement | Before full-label artwork |
| --- | --- |
| Performance | 100/100 |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 |
| First contentful paint | 1.2s |
| Largest contentful paint | 1.2s |
| Total blocking time | 0ms |
| Cumulative layout shift | 0 |
| Total transfer | 90 KiB |

A separate unthrottled Chrome navigation on this workstation showed content at 316ms and completed the load event at 358ms.
Those timings describe that connection and machine, not a promise for every visitor.

## Keeping the artwork fast

All four logos use local 256px WebP assets, totaling 16,350 bytes after the seamless-background refinement documented in [app icons](app-icons.md).
The complete image fills a square front label through CSS, with no larger source file, new image request, or new dependency.
Every icon in the initial shelf loads eagerly, removing the delayed-loading hint from Foodex and Umami World.
Image dimensions and the square label reserve their layout space.

Keep the prerendered HTML, system fonts, immutable hashed assets, and separate BapOS entry.
The default page must not request the archive's JavaScript, CSS, or wallpaper.
Use 100 KiB as the initial-transfer budget for the current collection and aim to retain a 100 mobile performance score, zero blocking time, and zero layout shift under the conditions above.
Lab timing varies; compare public builds under the same conditions and investigate regressions before adding preload hints or changing rendering architecture.

## Repeat the audit

Build with `npm run build` and inspect the production preview before publishing.
Run the performance audit in an isolated Chrome instance without a simultaneous browser interaction test:

```sh
npx --yes lighthouse@12.8.2 https://www.wengmichelle.com/ \
  --chrome-flags='--headless' \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=/tmp/portfolio-mobile.json --quiet
```

The Chrome DevTools AXI `lighthouse` wrapper omits the performance category, so it cannot answer the load-speed question by itself.
Retain the meaningful results and release reference here; raw audit reports and screenshots are temporary artifacts.

## Full-label build verification

`npm run build` passed TypeScript, both Vite entries, and prerendering.
Browser checks passed at 320, 390, 768, and 1440 CSS pixels: all seven shelf selections and dialogs, all four complete square icons, eager icon loading, fallback label text, no horizontal overflow, Escape, and focus return.
The checks confirmed that every logo fills its label in both the shelf and dialog while preserving its aspect ratio.
Phone and desktop rendered artwork was inspected visually.
The final production preview scored 100 in all four Lighthouse categories at `2026-09-09T19:09:03.173Z`, with 1.2s FCP, 1.7s LCP, 0ms TBT, and 0 CLS.
This preview ran locally; the baseline above was measured on the public domain, so these timings are not a before/after speed comparison.

## Published full-label results

PR [10](https://github.com/rirachii/michelleweng/pull/10) merged as `bcbac1bcfac8ef851d618f74e40ed217c2ec6530` and passed the Vercel production check.
The public HTML, both initial JavaScript files, CSS, all four icons, and `/bapos/` HTML match the tested build bytes.
Hashed assets retain immutable caching.

The public site was audited again with Lighthouse 12.8.2 at `2026-09-09T19:12:58.226Z` for mobile and `2026-09-09T19:13:09.960Z` for desktop.
Mobile used the same simulated settings as the baseline; desktop used Lighthouse's desktop preset.

| Measurement | Mobile | Desktop |
| --- | --- | --- |
| Performance | 100/100 | 100/100 |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| First contentful paint | 1.2s | 0.34s |
| Largest contentful paint | 1.4s | 0.34s |
| Total blocking time | 0ms | 0ms |
| Cumulative layout shift | 0 | 0 |
| Total transfer | 90 KiB | 90 KiB |

The public mobile score and transfer size remain unchanged from the baseline; LCP varied from 1.2s to 1.4s across the two runs.
Do not describe this artwork update as a measured timing improvement.
Live visual checks confirmed the complete Foodex logo and dialog at 320px and Converty at 1440px, with no document overflow or console errors.
The default page requests only its own bundles and the four icons; the original archive still renders its 11 desktop icons and taskbar.

## Seamless-background refinement

After PR [11](https://github.com/rirachii/michelleweng/pull/11), the two updated 256px WebP assets save 1,474 bytes while removing Converty and Foodex's inset background rims.
A public mobile Lighthouse 12.8.2 audit at `2026-09-09T19:30:23.853Z` retained performance 100, 1.4s LCP, 0ms TBT, and 0 CLS, with 90,754 bytes (88.6 KiB) total transfer.
This audit used the same simulated mobile settings; it checked the performance category only.

## Chirpberry and on-demand screenshots

The fifth 256px icon brings the eager icon total to 19,632 bytes.
The seven full screenshots and their small thumbnails are mounted only after project selection or detail navigation; none are requested by an initial visit to `/`.
The local production build passed TypeScript, both Vite entries, and prerendering.
A Lighthouse 12.8.2 audit at `2026-09-09T20:29:26.875Z` scored 100 in all four categories, with 1.35s FCP, 1.65s LCP, 0ms TBT, 0 CLS, and 93,721 bytes of total transfer.
This is a local production-preview audit under the same default simulated mobile settings, not a public-site or visitor field measurement.
The initial requests contained only the five icons and portfolio resources, with no screenshots or BapOS assets.
The initial transfer remains below the 100 KiB budget.
