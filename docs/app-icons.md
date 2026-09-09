# Portfolio app icons

Use verified app assets on the cartridge labels. Keep the original BapOS content and assets unchanged.

## Verified sources, September 9, 2026

| Project | Original asset | Portfolio asset |
| --- | --- | --- |
| Converty | [Published app icon](https://converty-pi.vercel.app/converty.png), also `site/public/converty.png` in the Converty repository | `public/assets/app-icons/converty-e2e22ee2.webp` |
| Umami World | [UMAMI app icon](https://github.com/rirachii/umamiapp/blob/cc451fa1cd8223295cc9c4546443d3cd5a7c20d0/assets/icon.png), explicitly configured by that commit's `app.json` | `public/assets/app-icons/umami-world-f1bbebd9.webp` |

The Converty local source matched the published file byte for byte (SHA-256 `3e9e76c1578622d1adff5cf7091971bcdc3a4ae3da73611510c916429308dc1e`).
The UMAMI icon belongs to the React Native project represented by the existing portfolio entry; it is not the separate Foodex icon.
Both were resized to 256 × 256 and encoded with `cwebp`. Converty uses quality 90; the monochrome UMAMI asset uses lossless encoding.
Their combined payload is approximately 7 KB. No artwork was regenerated or substituted.

The filename suffix is the first eight characters of the encoded file's SHA-256. Keep content hashes in replacement filenames so the existing `/assets/` immutable cache policy is safe.
Image URLs remain stable through prerendering and hydration.
Explicit dimensions reserve space; the five icons in the initial shelf load eagerly.

## Full-label presentation

Verified icons fill a square sticker across the cartridge front, using `object-fit: contain` with no inset image margins or additional rounded-icon mask.
The central app marks remain complete and undistorted on the shelf and in project dialogs.
Names remain in the ordinary page text and cartridge spines; only fallback illustrations retain printed titles and categories inside their labels.
The four current WebP files total 16,350 bytes, with no additional image request or runtime dependency.

## Seamless Converty and Foodex labels

The owner requested the same uninterrupted label edges shown by Oompf.
Converty and Foodex had glossy rounded-square rims baked into their original bitmaps, so their portfolio artwork now uses background edits derived from the verified originals above.
These are portfolio presentation derivatives, not new official app icons.
The original source images and previous compressed assets remain available.

| Project | Current portfolio asset | Bytes |
| --- | --- | --- |
| Converty | `public/assets/app-icons/converty-seamless-f44d737c.webp` | 3,714 |
| Foodex | `public/assets/app-icons/foodex-seamless-bbf20b33.webp` | 4,596 |

The built-in image tool removed the background rims and extended the existing blue/orange backgrounds to the square canvas edges, retaining the complete central arrows and noodle bowl.
The resulting assets were inspected and encoded at 256 × 256 using `cwebp -q 90 -m 6 -resize 256 256`.
Their combined 8,310 bytes save 1,474 bytes relative to the previous two images.
Oompf and Umami World's artwork and all cartridge layout rules are unchanged.

### Edit prompts

Each verified original was the sole edit-target reference in a separate built-in image-tool call.
The common instruction was: remove the entire glossy rounded-square perimeter, beveled rim, corner highlights, and inset app-tile boundary from the background; seamlessly continue the existing color to all four straight edges and square corners.
Keep the central cream-white 3D subject's silhouette, proportions, position, size, material, lighting, and shadows; do not crop, scale, move, or redesign it.
Do not add a frame, rounded tile, perimeter glow, outline, extra padding, text, or cartridge mockup.
Converty specified the saturated blue background and two opposing arrows; Foodex specified the vivid orange background and noodle bowl, noodles, and chopsticks.

## Foodex and Oompf additions, September 9, 2026

The owner supplied `https://foodex.space/` and `https://oompf.app/` for separate new cartridges. Umami World keeps its existing identity and icon.

- Foodex: `public/foodex/app-icon.png` in the `foodex.space` website repository, explicitly configured in `app/(foodex)/layout.tsx`. Source SHA-256: `21338e238c2156aff70902bc703ac767e55fda7b351c3917bf3c29d32ba9033e`.
- Oompf: `mobile/assets/common/branding/app-icon.png` in the `oompf` repository, explicitly configured in `mobile/app.config.ts`. Source SHA-256: `c1bc974752db3cfccb00a826b63a6e8b3da1f07b13983b90d32ee75fe262b8ea`.

Both 1024 × 1024 originals were visually inspected and resized to 256 × 256 WebP with Pillow, quality 84, method 6. The artwork was preserved. Portfolio assets are `public/assets/app-icons/foodex-51845474.webp` (4,754 bytes) and `public/assets/app-icons/oompf-ccda7e9a.webp` (5,992 bytes).

## Archived project artwork

No icon asset was found in the inspected `rirachii/shortstranscript` tree. No verified app icon or matching repository was found for Void Mail or Retro Cam.
Short Transcript, Void Mail, and Retro Cam have since been removed from the current portfolio; the five remaining projects all have verified icons.
Do not describe those fallback illustrations as actual app icons or manufacture a replacement brand mark.

## Chirpberry addition

The new Mac app uses `macOS/Artwork/Chirpberry.png` from the owner-supplied Chirpberry repository.
The native icon preparation script uses this artwork for `AppIcon.icns`, named in the app's Info.plist.
Source SHA-256: `91b2fdaa3b03c71ce02aeebe7a7fe4c98ba91f75c45ff9742da8d047a17819d7`.
The complete cream bird, pink wing, and beak remain visible on a seamless mulberry background, matching the requested Converty and Foodex edge treatment.

The built-in image tool used the original artwork as its sole edit reference.
The prompt removed only the glossy rounded-square tile rim, bevel, inset boundary, corner highlights, and transparent outer margins, extending the existing background to every straight canvas edge.
It required preserving the complete bird, wing, beak, and eye with their original silhouette, proportions, position, scale, materials, lighting, and shadows, and prohibited a new frame, padding, text, crop, or cartridge mockup.
The derivative is portfolio presentation artwork, not a replacement native app icon.

The inspected result was encoded with `cwebp -q 88 -m 6 -resize 256 256`.
`public/assets/app-icons/chirpberry-seamless-09609b30.webp` is 3,282 bytes.
All five current icons total 19,632 bytes.
Chirpberry links to https://github.com/rirachii/chirpberry using View source; its portfolio copy distinguishes locally saved notes from paid Valsea cloud speech, translation, and summaries.
