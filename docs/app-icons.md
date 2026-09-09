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
Image URLs remain stable through prerendering and hydration. Explicit dimensions reserve space; lower entries use native lazy loading.

## Sources still needed

No icon asset was found in the inspected `rirachii/shortstranscript` tree. No verified app icon or matching repository was found for Void Mail or Retro Cam.
Their pre-existing cartridge illustrations remain until the user supplies the actual icon files, app links, or repository paths.
Do not describe those fallback illustrations as actual app icons or manufacture a replacement brand mark.
