# Project screenshot previews

The owner referenced [Hivinz](https://hivinz.com/) on September 9, 2026.
The publicly rendered page and its text were inspected: featured apps pair compact project introductions with prominent real product screenshots.
The portfolio applies that presentation idea within its existing cartridge interaction, keeping its own composition and artwork.

## Behavior

Selecting Chirpberry, Converty, Oompf, or Foodex reveals a screenshot gallery below the shelf controls.
Opening their project details also shows the gallery, including visits through a direct project hash.
Alternative screens use thumbnail buttons with an explicit pressed state, and the selected caption stays in ordinary page text.
Full size opens the selected WebP in a new tab, allowing the browser's native image zoom.
Changing projects resets the gallery to its first screen.
Umami World has no verified screenshot source in this pass and retains its existing detail content.
Short Transcript, Void Mail, and Retro Cam were subsequently removed from the current collection.

The gallery is absent from initial prerendered HTML and is mounted only when requested.
Only the selected full screenshot and that project's small thumbnails load.
No video, image service, third-party image request, animation library, or new runtime dependency is introduced.
The original `/bapos/` entry and shared project data are unchanged.

## First-party sources

- Chirpberry: real native notebook captures from the existing built app, using an isolated temporary app copy and `CHIRPBERRY_DOCUMENTS_DIR` with synthetic JSON documents. The first image shows personal notes beside bilingual segments; the second shows an explicitly labeled example summary and checklist. Neither image contains real customer meetings, and the fixture content does not verify cloud recognition or generation. The original checkout, notes directory, and release configuration were not edited.
- Converty: `site/public/workspace.png` in the Converty repository, the existing Mac tool-workspace marketing capture.
- Oompf: unmodified frames from `oompf-marketing/launch-demo-hyperframes/assets/walkthrough-media/roleplay-full.mp4` at 4 seconds (Dojo) and `spin-topic-full.mp4` at 10 seconds (speaking practice). These are existing first-party product walkthroughs, extracted with ffmpeg and inspected for visible personal data before reuse.
- Foodex: `public/foodex/screens/country-atlas.png` and `capture-confirm.png` in the Foodex Space website repository, existing product marketing captures.

No UI was generated or reconstructed for these screenshots.
Source pixels were resized and encoded with `cwebp -q 88 -m 6`, retaining complete frames.
Desktop captures use 1200 or 1400 pixels of width; phone captures use 480 pixels.
Thumbnail files use 160 pixels of width and quality 75.
Each filename suffix is the first eight characters of its encoded SHA-256, matching the immutable `/assets/` cache policy.

## Encoded assets

| Screen | Main file | Main bytes | Thumbnail bytes |
| --- | --- | --- | --- |
| chirpberry-notebook | `chirpberry-notebook-1bc967b9.webp` | 40,048 | 1,216 |
| chirpberry-summary | `chirpberry-summary-fc55a375.webp` | 41,470 | 1,182 |
| converty-workspace | `converty-workspace-df768c18.webp` | 59,778 | 1,724 |
| oompf-dojo | `oompf-dojo-757668cb.webp` | 35,858 | 6,706 |
| oompf-practice | `oompf-practice-7dc2331e.webp` | 24,548 | 5,068 |
| foodex-atlas | `foodex-atlas-86d995f2.webp` | 34,864 | 5,086 |
| foodex-capture | `foodex-capture-9e7d47aa.webp` | 27,138 | 4,030 |

## Screenshot release verification

The production build passed TypeScript and prerendering.
Browser checks at 320, 390, 768, and 1440 CSS pixels covered every shelf selection, all eight detail dialogs, thumbnail switching, full-size image opening, screenshot reset when returning to a project, keyboard arrows and Home, Escape and focus return, and no document overflow.
Network observation at each width confirmed zero initial screenshot requests and no archive resources on the root page.
The rendered Chirpberry desktop and Foodex phone galleries were inspected at both 320px and 1440px.
Direct Chirpberry hash navigation, its source link, reduced motion, and the original archive also passed with no browser errors.
Live checks at 320px and 1440px confirmed all eight controls, Chirpberry gallery switching and source action, Foodex preview loading, no initial screenshot requests, and no overflow or browser errors.
The Foodex atlas caption describes its public discovery map rather than implying that the public counts are a personal collection.
See `performance.md` for the mobile audit and `cartridge-release.md` for the production gate.
