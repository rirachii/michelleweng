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
