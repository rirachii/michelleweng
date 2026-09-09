# Cartridge portfolio design contract

The root website is a normal, scrolling portfolio for Michelle Weng.
Its job is to help a visitor understand what Michelle builds, inspect a project, and start a conversation.
The original BapOS interface remains a separate experience at `/bapos/`; its contract is preserved in `docs/BAPOS-DESIGN.md`.

## Direction and hierarchy

The visual direction is quiet, tactile, nostalgic, and readable.
The Game Boy reference belongs in the original cartridge shapes, molded shells, printed labels, and restrained control details.
Cartridge shells and fallback illustrations are CSS. Labels use the actual app icons when a source is verified, with their provenance recorded in `docs/app-icons.md`.
Do not substitute invented logos for missing app icons or use copied game covers or official Nintendo marks.

The reading order is identity and navigation, a short introduction, the project collection, about, writing, contact, and the original-site link.
Project exploration is the main action at the collection; email is the main action at contact.
A visitor must never need to boot a simulated device, double-click an icon, or drag an object to reach portfolio content.

The user supplied these Threads references:

- https://www.threads.com/share/_usSrmah4/
- https://www.threads.com/share/_zUk_P_nU/
- https://www.threads.com/share/BAW4L91Pq3/
- https://www.threads.com/share/HZHcvZIBn/

The earlier review encountered a login gate. On September 9, the last reference opened publicly and its full 19-second clip was inspected. It resolves to Mamuso's "it needs to work on mobile" post. The key pattern is an upright shelf: cartridges rest side by side, then the selected cartridge pulls forward and rotates to show its face. A short introduction and caption keep attention on the objects.
See `docs/upright-shelf.md` for the observed reference, the vgpu investigation, implementation choice, and verification.

## Layout

- Use a narrow, centered page with a short personal introduction above the interactive shelf.
- Five upright Game Boy cartridges fit side by side at rest. Selecting one centers and rotates its front toward the visitor, moving the neighboring spines aside.
- The selected name, summary, and explicit View project action sit below the shelf. Keep that area's height stable when content changes.
- Tap/click selects a preview; View project opens the native dialog. Arrow buttons, horizontal touch swipes, horizontal trackpad gestures, and keyboard arrows also browse the shelf.
- Keep vertical document scrolling native. Swiping is optional; every project is also available in the All projects disclosure beneath the shelf.
- Tablet and mobile retain the same hierarchy with smaller cartridge faces. Supporting sections and dialog contents stack on small screens.
- Minimum verified target width is 320 CSS pixels. The initial five cartridge buttons must each have at least a 44px hit target.
- Neighboring cartridges may be clipped within the shelf when one is selected. The selected face and caption must stay fully visible without document overflow.

## Tokens and type

`src/portfolio.css` owns the palette and styling.
The background is warm paper `#f5f4ef`, primary ink is `#30332d`, muted text is `#696e61`, and dividers are `#ddded5`.
Project labels use orange, pale green, violet, warm yellow, and pale blue; surrounding UI stays neutral with restrained olive accents.
Body and display type use the system sans-serif stack; metadata uses a local monospace stack.
No remote font request is allowed for the default page.
Decorative text on cartridge artwork is hidden from assistive technology because project information appears in normal text alongside it.

## Interaction and accessibility

Cartridges are semantic preview buttons with `aria-pressed` selection and accessible project names.
Click, tap, Enter, and Space select them. Arrow keys, Home, and End move both selection and keyboard focus.
View project and the All projects list open native modal dialogs.
Native dialogs provide modal focus containment and inert background content.
Close, Escape, and backdrop clicks dismiss a dialog; focus returns to the opening button.
Each project has a hash URL, and next, previous, browser Back, and direct reload preserve the corresponding selection.
Writing opens the existing saved summaries without implying that these are full external articles.

Keep visible focus rings, adequate text contrast, a skip link, page headings, useful control labels, and at least 44px primary control targets.
Only successful clipboard writes may show the copied state; failures point users to the visible email address.
Do not add unverified project links, metrics, client logos, or fabricated case-study outcomes.

Hover motion applies only to fine pointers with hover support.
The reduced-motion query removes transitions, animations, and smooth scrolling, including the dialog backdrop.
Do not introduce autoplay, perpetual animation, scroll hijacking, novelty cursors, or a forced loading screen.

## Motion

Use finite motion to reinforce the cartridge interaction and guide the reading order.
Shelf motion uses CSS transforms and finite transitions. There is no frame loop, global scroll listener, canvas, or graphics runtime.
Cartridges are made from front, back, spine, and edge faces in CSS 3D space. Keep shell colors consistent across faces and actual app icons on the front labels.
Hover gently tilts a cartridge without changing selection or moving its hit target. Selection is explicit and stable under a stationary pointer.
Reduced motion changes shelf positions immediately with no transition. The project list remains readable in prerendered HTML before JavaScript runs.
Each fallback label can play one short effect inside its opened project dialog; do not add looping shelf effects.

Initially visible text stays fully visible through first paint and hydration.
Lower sections may reveal once when they enter the viewport, but are never hidden waiting for JavaScript or an observer.
Focusing a reveal target makes it immediately readable.
All effects must stop when the reduced-motion preference changes, including effects already running.

Dialogs use native open/close behavior with progressive CSS entry and exit transitions.
Keep the last detail content mounted through the exit so the dialog does not collapse before fading out.
Rapid close/reopen and pagination must always reflect the latest selection, with no delayed state-changing timers.
Changing projects resets dialog scroll and moves reading focus to the new title; closing returns focus to the opening View project or list button.
Browsers without discrete-transition support retain immediate, functional native dialogs.
Use CSS and the Web Animations API without adding an animation runtime dependency.

## Performance and isolation

Prerender the main page HTML during the build and hydrate it for interactions.
Keep browser-only state reads inside effects so production hydration matches its static HTML.
The default route must not import BapOS desktop code, its CSS, Zustand, or the wallpaper.
The build can share React and content between the two entries.
The archive must retain its existing local storage key and data.
Use original CSS shells and system fonts instead of a 3D engine or large cartridge renders.
Keep real app icons locally in small, versioned WebP files under `public/assets/app-icons/`, with explicit dimensions and lazy loading for lower entries. Content hashes in filenames allow immutable caching without stale icons.
Fingerprint production assets and cache them immutably.
