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
