# Cartridge label readability

Updated September 9, 2026, after the user identified hard-to-read lettering in a screenshot of the upright shelf.

The resting faces are deliberately angled, so larger printed text alone cannot make them easy to scan. Each cartridge now has a flat project name below it. The selected cartridge settles facing straight forward, and its caption uses larger type.

## Treatment

- Flat names are 12px on phones and 13px at larger widths, with enough spacing for Short Transcript and Converty. The selection button extends over the name.
- The front label uses a consistent, bold system sans-serif project name in title case. Its 23–32px size follows the actual cartridge width, including within a dialog.
- The front's category is 12px. Tiny brand lines, taglines, serial numbers, duplicate numbers, and label ornaments are removed.
- The molded Michelle mark and spine names have stronger contrast. Purple and yellow labels use the same readable title treatment as the other cartridges.
- Label grain is removed from the printed area. App icon assets and original BapOS source are unchanged.
- Selected captions are 20–21px, with 15px descriptions and a 14px View project action. The reserved caption area and shelf height accommodate the larger text.
- The resting shelf retains its depth and finite motion. Selected faces remain straight ahead during hover; reduced motion still updates selection immediately.

These refinements use the existing CSS and React components, with no new font, image asset, or runtime dependency.

## Verification

The production TypeScript/Vite/prerender build passes. Browser inspection at 320, 390, 768, and 1440 CSS pixels confirms that all five flat names fit, every selected title fits its label, and the page has no horizontal overflow. Selected front titles measure 23–31.64px; category text is 12px. Selection targets are at least 44px wide at rest, and hit testing confirms that a flat name routes to its cartridge's button.

All five selected faces were checked at each width, with the settled transform facing directly forward. Converty's dialog title fits and its real icon loads at every checked width. Desktop and phone idle/selected states were inspected visually, including the 320px layout after names were split into one word per line.

The complete initial HTML, JavaScript, CSS, favicon, and both existing icons total 74,966 bytes gzip. The original BapOS JavaScript, CSS, and shared content hashes are unchanged.

Lighthouse 12.8.2 checked the final production preview at `2026-09-09T05:30:24.295Z` with default simulated mobile conditions. Performance, accessibility, best practices, and SEO each score 100, with no failed accessibility audits. LCP is 1.5s, total blocking time 0ms, and cumulative layout shift 0. These are synthetic lab results, not visitor field measurements.
