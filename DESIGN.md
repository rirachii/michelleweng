# Cartridge portfolio design contract

The root website is a normal, scrolling portfolio for Michelle Weng.
Its job is to help a visitor understand what Michelle builds, inspect a project, and start a conversation.
The original BapOS interface remains a separate experience at `/bapos/`; its contract is preserved in `docs/BAPOS-DESIGN.md`.

## Direction and hierarchy

The visual direction is quiet, tactile, nostalgic, and readable.
The Game Boy reference belongs in the original cartridge shapes, molded shells, printed labels, and restrained control details.
All cartridge artwork is CSS; it uses no copied game covers or official Nintendo marks.

The reading order is identity and navigation, a short introduction, the project collection, about, writing, contact, and the original-site link.
Project exploration is the main action at the collection; email is the main action at contact.
A visitor must never need to boot a simulated device, double-click an icon, or drag an object to reach portfolio content.

The user supplied three Threads references:

- https://www.threads.com/share/_usSrmah4/
- https://www.threads.com/share/_zUk_P_nU/
- https://www.threads.com/share/BAW4L91Pq3/

Threads showed a login gate during review, and the web reader required authentication.
The first visible post was by `mamuso`, captioned "it needs to work on mobile", with a phone preview partly obscured by the dialog.
Full reference media was not verified.
The implemented direction follows the user's explicit requests for a clean portfolio, Game Boy cartridges, responsive layouts, and fast loading.

## Layout

- Desktop: a restrained page width, a four-column cartridge collection, two-column about, and simple writing rows.
- Tablet: a two-column collection with larger cartridge art and retained project descriptions.
- Mobile: a two-column collection, stacked supporting sections, and single-column dialog contents.
- Minimum verified target width: 320 CSS pixels.
- The cartridge tilt may extend inside the visual stage but must not create document overflow or obscure labels.
- Project names and descriptions remain visible below the artwork, including on touch devices.

## Tokens and type

`src/portfolio.css` owns the palette and styling.
The background is warm paper `#f5f4ef`, primary ink is `#30332d`, muted text is `#696e61`, and dividers are `#ddded5`.
Project labels use orange, pale green, violet, and warm yellow; surrounding UI stays neutral with restrained olive accents.
Body and display type use the system sans-serif stack; metadata uses a local monospace stack.
No remote font request is allowed for the default page.
Decorative text on cartridge artwork is hidden from assistive technology because project information appears in normal text alongside it.

## Interaction and accessibility

Cartridges are semantic buttons that open native modal dialogs.
They work with click, tap, Enter, and Space.
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
The collection settles into place with a 640ms arrival and 65ms spacing between cartridges.
Each label plays one short effect on hover, keyboard focus, or opening: waveform, rising steam, mail through a portal, or camera sparkle.
Fine-pointer tilt is limited to 5 degrees vertically and 7 degrees horizontally, updated at most once per animation frame and reset on exit.
Touch controls must not require hover or use pointer tilt.

Initially visible text stays fully visible through first paint and hydration.
Lower sections may reveal once when they enter the viewport, but are never hidden waiting for JavaScript or an observer.
Focusing a reveal target makes it immediately readable.
All effects must stop when the reduced-motion preference changes, including effects already running.

Dialogs use native open/close behavior with progressive CSS entry and exit transitions.
Keep the last detail content mounted through the exit so the dialog does not collapse before fading out.
Rapid close/reopen and pagination must always reflect the latest selection, with no delayed state-changing timers.
Changing projects resets dialog scroll and moves reading focus to the new title; closing returns focus to the original cartridge.
Browsers without discrete-transition support retain immediate, functional native dialogs.
Use CSS and the Web Animations API without adding an animation runtime dependency.

## Performance and isolation

Prerender the main page HTML during the build and hydrate it for interactions.
Keep browser-only state reads inside effects so production hydration matches its static HTML.
The default route must not import BapOS desktop code, its CSS, Zustand, or the wallpaper.
The build can share React and content between the two entries.
The archive must retain its existing local storage key and data.
Use original CSS artwork and system fonts instead of a 3D engine or raster cartridge assets.
Fingerprint production assets and cache them immutably.
