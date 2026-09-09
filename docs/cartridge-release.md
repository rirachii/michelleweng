# Cartridge portfolio release

## Scope

Replace the main portfolio with the responsive cartridge collection.
Preserve the original BapOS source and expose its separate entry at `/bapos/`.
Keep the existing portfolio content and contact details.

## Preservation and deployment target

- Original source: `a98e05e6fccd2948a436f9c7911840ff84829ebf`.
- Archive branch: `archive/bapos-os-2026-09-08`.
- Original deployment: `https://michelleweng-16kfzueht-rirachiis-projects.vercel.app`.
- Redesign branch: `feat/gameboy-portfolio`.
- Production project: `rirachiis-projects/michelleweng`.
- Production domain: `https://www.wengmichelle.com`.
- Original experience after replacement: `https://www.wengmichelle.com/bapos/`.

The original Vercel production deployment's Git SHA was checked against the archived commit before replacement.
The repository's `vercel.json` explicitly selects Vite so the old Next.js dashboard preset does not determine the new build.
The Vercel build completed successfully for the new multi-page, prerendered site before promotion.

## Verified on September 8, 2026

- `npm run build`: TypeScript, both Vite entries, and HTML prerendering pass.
- The production HTML contains the introduction and project collection before JavaScript executes.
- Initial HTML, JavaScript, CSS, and favicon total 62,155 bytes with gzip in the checked local build.
- No external fonts, initial image downloads, or new runtime dependencies.
- Browser widths checked: 320, 390, 768, and 1440 CSS pixels.
- No document horizontal overflow at the checked narrow widths.
- All four project dialogs open and close, with focus returned to their buttons.
- Next, previous, browser Back, and direct project hash reload work.
- Writing opens the existing saved note content.
- Email copy displays success only after a successful clipboard write.
- The original desktop renders with 11 icons and its taskbar at `/bapos/`.
- No browser console errors were reported for the new production build.
- Mobile Lighthouse: accessibility 100, best practices 100, SEO 100.

The Lighthouse command used here does not score performance.
The compressed-byte result is a build measurement, not a claim about every visitor's network timing.
The additional agentic-browsing category reports a missing optional `llms.txt`; this is outside the portfolio's requested behavior.

## Release and rollback

Verify the final public domain after promotion, including one project dialog, the archive route, the page title, and static asset responses.
Retain the archive ref and original deployment when updating the production branch.

If a full rollback is needed, promote the original deployment using the existing authenticated Vercel CLI:

```sh
vercel promote michelleweng-16kfzueht-rirachiis-projects.vercel.app --yes
```

This rolls the domain back to the original OS-only site.
The archive source can also be checked out independently without resetting the redesign branch:

```sh
git worktree add ../bapos-original archive/bapos-os-2026-09-08
```

## First published release

The cartridge portfolio was published to `https://www.wengmichelle.com` on September 8, 2026.
PR https://github.com/rirachii/michelleweng/pull/1 merged as `d50b8e4550a77fe780697ded80b15397185b3fdb`.
Vercel deployment `dpl_EYUrVE1mzxVBDXFzENwDArHSPZSH` (`https://michelleweng-ijirpvlr1-rirachiis-projects.vercel.app`) reached Ready and received the existing portfolio domains.

Live checks confirmed the prerendered page, all four cartridges, a functioning Umami World dialog, and no horizontal overflow at 390px.
Both `/bapos` and `/bapos/` return the separate original desktop entry with HTTP 200.
The original desktop renders with 11 icons and its taskbar on the live domain.
The new JavaScript and CSS return HTTP 200 with `public, max-age=31536000, immutable` caching.
No console errors were reported during the live portfolio interaction check.
The archive and redesign branches were pushed to both repository remotes.

## Live retest and readability fix

A second live retest on September 8, 2026 (audit timestamp `2026-09-09T02:01:23Z`) passed all four project dialogs, all three writing dialogs, previous/next wrapping, browser Back, direct project URLs, Escape/focus return, email copy, and the résumé data/download target.
The site had no horizontal overflow at 320, 390, 768, or 1440 CSS pixels.
The archive's 11 icons, taskbar, and Start menu rendered correctly.
The page, archive routes, favicon, robots file, and initial assets returned HTTP 200; asset caching remained immutable.

A fresh, isolated Lighthouse 12.8.2 audit of the public domain used simulated mobile throttling (150ms RTT, 1.6Mbps throughput, 4x CPU slowdown).
It scored performance 98, accessibility 100, best practices 96, and SEO 100, with 1.2s FCP/LCP, 0ms total blocking time, and zero cumulative layout shift.
These are synthetic lab measurements, not field measurements for all visitors.

The best-practices deduction identified mobile font legibility: project descriptions were 11px and only 52.7% of visible text met the audit's 12px threshold.
Two responsive overrides were removed so project descriptions inherit the existing 12px base size at every width.
The original cartridge artwork and archived BapOS were unchanged.
A rebuilt production preview confirmed 12px descriptions and no horizontal overflow at 320, 390, and 900px.
The targeted post-fix Lighthouse check on the production preview passed font legibility (69.58% of text at least 12px) and scored best practices 100.

## Motion update

PR https://github.com/rirachii/michelleweng/pull/3 published the cartridge motion update on September 8, 2026, from merge `2107af60da084b01091a422b86a3c65e065ecc29`.
The build, 50 browser assertions, mobile/desktop visual checks, and live-domain checks passed.
The live Lighthouse audit scored performance 98 and all other standard categories 100, with 1.3s LCP and zero layout shift.
The original archive still renders its 11 icons and taskbar, and its preserved source ref is unchanged.
See [the motion review](motion-review.md) for the behavior contract, content assessment, payload, audit conditions, and full verification scope.

## Converty addition

Converty is cartridge 05 with an original blue label, a finite file-conversion effect, and a direct link to `https://converty-pi.vercel.app/`.
Its description and SwiftUI/AppKit tags were verified against that product website on September 9, 2026.
New projects live in `src/portfolio-content.ts`, extending the original collection without changing the archive's content module.
Collection counts and previous/next wrapping use the actual number of projects.
The grid uses five columns at 1200px and above, three at intermediate widths, and two at 800px and below.

The production build and 27 browser assertions pass, covering 320/390/768/1024/1200/1440px layouts, Converty's dialog and direct hash, its website link, navigation wrapping, focus return, finite animation, and reduced-motion interruption.
Desktop and mobile dialog visuals were inspected in Chrome.
Initial HTML, JavaScript, CSS, and favicon total 65,286 bytes gzip, an increase of 853 bytes over the motion release.
The BapOS JavaScript, CSS, and shared original content retain their previous asset hashes.

## Vertical collection update

The five projects now form one overlapping vertical stack at every screen size, driven by normal page scrolling. The nearest cartridge lifts forward, keyboard focus brings its cartridge forward, and reduced motion keeps the transforms static. Converty and Umami World use verified local app icons; the other three retain their existing illustrations pending verified assets. The archive link is labeled **My OS**.

The production build, 42 browser assertions, and desktop/mobile visual inspection pass. Initial content including both icons totals 73,430 bytes gzip. All four standard Lighthouse categories score 100 in the local production preview. See [the vertical collection review](vertical-collection.md) for the interaction contract, source limitations, and audit conditions.

PR https://github.com/rirachii/michelleweng/pull/5 merged as `0e7c086743fccdbf6a7494ad60cedb752d236e34`; Vercel reported success for the production commit. Live checks on September 9, 2026 confirmed the five-cartridge stack, the My OS link, Converty's dialog and loaded icon, and no horizontal overflow at 390px. Both icon files return `image/webp` with immutable caching and match the tested local bytes. The public JavaScript and CSS hashes match the tested build. The archive route still renders its original desktop with 11 icons and its taskbar, and the archive source ref remains unchanged. No browser console errors were reported during the live portfolio check.

## Upright shelf update

The collection now uses an upright shelf, following the newly visible mobile reference: a selected cartridge comes forward and turns to show its face. The page has a shorter introduction, horizontal swipe and trackpad browsing, keyboard navigation, and a plain All projects list. View project opens the existing detail dialog. CSS 3D faces provide the depth without a graphics runtime or new dependency.

The production build and 69 browser assertions pass. Desktop/mobile idle and selected states were inspected visually. The complete initial payload is 75,101 bytes gzip, and all four standard Lighthouse categories score 100 in the final local production preview. The original OS, its archive ref, app icons, and My OS link remain preserved. See [the upright shelf review](upright-shelf.md) for reference research, interaction details, and audit conditions.

PR https://github.com/rirachii/michelleweng/pull/6 merged as `0029a8e35b86e06c07986b8565ebf91bf846c444`; its Vercel production check succeeded. The public JavaScript and CSS match the tested build bytes and retain immutable caching. Live checks confirmed all five shelf buttons, Converty selection and its dialog/icon at 1440px, Umami selection/icon at 390px, no horizontal overflow, the My OS link, and the archive's 11 icons and taskbar. No browser console errors were reported. The live website was opened in Comet.

## Label readability update

PR https://github.com/rirachii/michelleweng/pull/7 merged as `d14704a784ebeb994d6bb86f64a585459f50ff5b`, and its Vercel production check succeeded. Larger bold labels, stronger contrast, flat project names, and a straight-on selected face address the user's readability screenshot. Miniature decorative print is removed. See [the readability review](label-readability.md) for type sizes, responsive checks, and the 100-point mobile lab audit.

Live verification at 320px confirmed all five names, a 23px Converty title, the unrotated selected face, no horizontal overflow, and a working dialog with its actual icon. The production JavaScript, CSS, and `/bapos/` HTML match the tested build bytes. My OS remains linked, the archive source ref is unchanged, and no browser console errors were reported. The updated site was opened in Comet.


## Direct project websites, September 9, 2026

Converty, Oompf, and Foodex lead the seven-cartridge collection, using the owner-supplied URLs `https://converty-pi.vercel.app/`, `https://oompf.app/`, and `https://foodex.space/`. Oompf and Foodex are separate additions; the original four projects and all existing project hashes remain available.

Selecting a linked cartridge exposes a primary Visit website link alongside Project details. The project index displays a direct hostname link, and dialogs retain their website action. Links open in a new tab with `noopener noreferrer` and descriptive accessible names. Website links are prerendered in the project index. The shelf uses a single keyboard Tab stop, allowing Tab to move from the selected cartridge to its actions; arrow keys still browse all seven.

The two new verified app icons add 10,746 bytes of local WebP assets. No dependency was added. See [app icon provenance](app-icons.md) for the configured original assets and checksums.

The Halfstep example could not be inspected because the browser showed a certificate interstitial. Converty and Oompf returned HTTP 200 during the public URL check. Foodex encountered a certificate trust error from this environment; its link is the exact HTTPS URL supplied by the owner. No certificate interstitial was bypassed.


Validation: `npm run build` passed. The final production preview passed 69 browser assertions at 320, 390, 768, and 1440 CSS pixels, covering all seven selections, readable selected labels, 44px action targets, no horizontal overflow, matching website links in the shelf/index/dialogs, native external-tab activation, keyboard focus and wrap, reduced motion, every existing and new project hash, every project-index dialog, prerendered website links without JavaScript, and My OS. No browser errors were reported.

The final local production preview scored 100 for Performance, Accessibility, Best Practices, and SEO in Lighthouse 12.8.2 with default simulated mobile settings at `2026-09-09T15:21:54.623Z`. LCP was 1.6 seconds, TBT 0 ms, and CLS 0. These are local lab results, not field measurements.

PR [8](https://github.com/rirachii/michelleweng/pull/8) merged as `55aa9674a3702db2ca4cc19a99df19a919b7c1e6`; its Vercel production check succeeded. The public HTML, JavaScript (`portfolio-CnfxxE2V.js`), CSS (`portfolio-lRyVfOWc.css`), both new icons, and `/bapos/` HTML match the tested build bytes. New icons return `image/webp` with immutable caching. Live checks at 320px confirmed all seven project controls, Oompf's website action/dialog/icon, all three index URLs, and no overflow. At 1440px, Foodex's website action and icon rendered correctly without overflow. The browser reported no console errors. The archive source ref remains `a98e05e6fccd2948a436f9c7911840ff84829ebf`.

## Collection controls, September 9, 2026

All projects now sits at the top right beside Selected work, replacing the decorative Pick a cartridge note. The duplicate lower control is gone. Its native disclosure contains the existing seven-project index and three website links in a bounded panel. Outside click, Escape, or keyboard focus leaving dismisses it; opening a project dialog preserves the menu and its return-focus target. Arrow controls now have 24px of space above them.

The production build passed. Browser checks at 320, 390, 768, and 1440 CSS pixels confirmed the top-right alignment, a single 44px menu trigger, the exact 24px action-to-navigation gap, no document overflow, bounded menu dimensions, all index content, project-dialog opening and focus return, keyboard activation, Escape, outside-click dismissal, and dismissal when Tab leaves the menu. The bundle adds no dependencies or assets.

The reviewed source merged through PR [9](https://github.com/rirachii/michelleweng/pull/9) as `f7a4a33c85233dfa490a2d286d89957c1ef2d075`, following a successful Vercel preview build. Production verification is a separate gate; check for `portfolio-DJ6gOo4U.js` and `portfolio-kjDJPVhY.css` on the public domain before reporting this update live.
