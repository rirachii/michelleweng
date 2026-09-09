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

All four verified logos reuse the existing 256px WebP assets, totaling 17,824 bytes.
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
