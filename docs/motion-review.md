# Cartridge motion and website review

Reviewed September 8, 2026, against the production portfolio at `https://www.wengmichelle.com` and the production build of `feat/cartridge-motion`.
The pre-motion production source was `06728cc22cf205ecb6d5b690596ff665d546fc2f`.

## Website assessment

The page has a clear reading order, visible project names and summaries, a distinctive cartridge collection, and direct contact actions.
The two-column mobile collection and four-column desktop collection remain readable without turning the portfolio into a simulated device.
The first version's interactions were sparse: one hover lift, immediate dialog changes, and no feedback as lower sections came into view.

The motion update adds character to the existing hierarchy:

- Cartridges settle into place with a short stagger.
- Each label has a distinct finite effect: waveform, steam, portal/mail, or camera sparkle.
- Desktop pointer movement gently tilts the selected cartridge; focus and press provide separate feedback.
- Dialogs enter and exit smoothly, with a cartridge insertion and staggered detail copy.
- Lower content reveals once on scroll, with subtle navigation, writing, and clipboard feedback.

The main remaining portfolio weakness is project evidence. Current content has brief descriptions and stacks but no verified project URLs, screenshots of the products, detailed roles, or supported outcomes.
Prioritize real demo/repository links and one concise case study per project with the problem, Michelle's contribution, implementation decisions, and actual result.
The writing entries are saved summaries, and the résumé currently downloads as Markdown.
These are content gaps; this update does not invent missing work or claims.

## Implementation constraints

CSS owns decorative animation and native dialog transitions. `src/usePortfolioMotion.ts` owns progressive scroll reveals, pointer tilt, and cancellable detail-copy animation.
No new dependency, font, image, video, or external runtime request was added.
The first paint remains visible, and initially visible text is not faded during hydration.
Scroll enhancement never starts with hidden content, and keyboard focus finishes an active reveal.
Every effect is finite; the page has no idle animation loop.

The dialog keeps its last content through the native exit transition and separates displayed content from the open selection.
Pagination changes reading focus to the new heading and resets scroll.
There are no delayed state-changing close timers, so quick reopening cannot select stale content.
Browsers without discrete-transition support keep immediate native dialog behavior.
The implementation follows the native transition behavior described in [MDN's dialog documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) and uses the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate).

Reduced motion disables CSS animation, CSS transitions, pointer tilt, and scroll/detail animation, including when the preference changes mid-animation.
Testing caught a remaining backdrop opacity transition when the preference changed. An explicit reduced-motion override on `::backdrop` fixes it.

## Browser verification

The production build passes `npm run build`, including TypeScript, both Vite entries, and prerendering.
The rendered page and modal were visually inspected in Chrome at 390px and 1440px.
An isolated Chrome session used the DevTools protocol for precise interaction and media-preference checks because the normal browser CLI does not expose reduced-motion emulation.
The rebuilt output passed 50 assertions:

- Finite, staggered entrance; no running animations when idle.
- Opening, closing during entry, visible exit, and reopening during exit retain the correct content and return focus.
- Rapid next/previous navigation, wrapping, browser Back, Escape, and direct hash reload.
- Reduced motion interrupts both detail and scroll effects; opening/closing remains immediate and content stays visible.
- Fine-pointer tilt stays within its limits and clears on pointer exit; touch emulation disables it.
- Scroll reveals run once and do not replay when revisiting a section.
- Document and all four dialogs fit 320, 390, 768, and 1440 CSS-pixel widths without horizontal overflow.
- A 320 × 568 viewport retains a scrollable dialog within the screen.
- Project descriptions remain at least 12px.
- All three writing dialogs open with their saved content.
- The normal browser interaction confirms that copying email displays the success label and live status after the clipboard write.
- The prerendered introduction and four projects remain visible with JavaScript disabled.
- No browser errors were reported.

The browser tests ran against built artifacts, not only the development server.
These are Chrome checks; they do not claim physical-device or Safari verification.

## Payload and performance

The checked production build's initial HTML, JavaScript, CSS, and favicon total **64,433 bytes with gzip**.
This is approximately 2.3 KB more than the first cartridge release's measured 62,155 bytes.
The default entry still excludes the original BapOS JavaScript, CSS, and wallpaper.
Payload measurements describe these build artifacts, not every visitor's transfer timing.

A first Lighthouse 12.8.2 run during other browser checks scored performance 91 and the other categories 100, with FCP 1.2s, LCP 1.4s, TBT 0ms, and CLS 0.
Its speed-index result was anomalously slow (10.8s): the trace recorded document load at 116ms but first paint at 7.3s.
The final serial audit at `2026-09-09T02:55:53Z` scored **100 for performance, accessibility, best practices, and SEO**.
FCP, LCP, and speed index were 1.3s; total blocking time was 1ms (displayed as 0ms after rounding), and cumulative layout shift was zero.
Observed first paint in this run was 362ms.
Both audits used Lighthouse 12.8.2 with the default simulated mobile throttling; these are synthetic lab results, not field performance measurements.
