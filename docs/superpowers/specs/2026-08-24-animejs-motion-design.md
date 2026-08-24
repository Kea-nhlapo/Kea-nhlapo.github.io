# Anime.js Motion Design

Date: 24 August 2026
Status: Approved design

## Purpose

Add moderate motion to the backend portfolio without weakening its recruiter focus. Animation should explain sequence, reinforce hierarchy, and respond to deliberate interaction. It should not compete with the project evidence.

## Dependency

The site will use Anime.js 4.5.0, pinned to that version and loaded as an ES module from jsDelivr. The site has no build step, so the browser will import only the functions used by the animation module.

The HTML and CSS remain complete without Anime.js. If the CDN request fails, every section, link, diagram, and navigation control remains visible and usable.

## Motion system

### Hero sequence

The hero starts one short timeline after the document is ready:

1. The location and role line enters.
2. The heading reveals by word with a restrained vertical stagger.
3. The supporting paragraph and actions enter together.
4. The backend profile panel follows.
5. Profile rows enter in order, ending on the active state.

The heading will be split into accessible word wrappers in the existing markup or with the Anime.js text utility. The accessible name must remain the full heading. The final layout must not shift after font loading.

### Project entrances

Each project animates once when it enters the viewport. The project number, labels, title, description, decisions, stack, actions, and diagram enter as one coordinated timeline. Stagger values will stay short so the reader never waits for content.

### System diagrams

Each project diagram will animate in the order that data moves through the system.

- Mint: machine signal, risk API, approvals, inventory, work order, live workflow state
- WattWise: meter reading, signal bars, Arduino, Python bridge, FastAPI, PostgreSQL
- CivicLens: image scan, classification, severity, department route, report-ready state

Diagram motion will run once on entry. Small status indicators may continue at a slow rate if they do not draw attention away from the copy.

### Interaction feedback

Primary buttons, project links, and the backend profile panel will receive small hover and focus responses. Motion will use short translation, scale, or accent changes. Cursor-following effects, draggable elements, particles, and sound are out of scope.

## Copy

The existing portfolio copy remains unchanged unless a technical label must be shortened for animation. Any changed label must describe a real state or system step. It must pass the no-ai-slop checks for filler, inflated claims, dramatic fragments, and vague professional language.

## Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Anime.js entrance timelines will not run.
- Diagram sequences will render directly in their final state.
- Looping indicators will stop.
- Navigation and all content will remain usable.
- Instant color changes may remain where they communicate hover or focus.

## Failure handling

The base CSS will render final states. JavaScript will apply animation-ready styles only after Anime.js imports successfully and reduced motion is not requested. A failed import must not hide content or prevent the mobile menu and current-year script from working.

The mobile navigation code will remain independent of the animation module. One animation failure must not stop unrelated interactions.

## Performance

- Prefer transforms and opacity.
- Avoid layout-dependent animation inside scroll handlers.
- Trigger each section once.
- Do not animate large shadows or filters frame by frame.
- Keep concurrent looping animations to a minimum.
- Do not add image or video assets for motion.

## Verification

The finished implementation will be checked at desktop and mobile widths for:

- Correct hero order and project sequencing
- No content flash, permanent hidden state, or layout shift
- Working mobile navigation and keyboard focus
- Reduced-motion behavior
- Readable final states with JavaScript disabled
- Readable final states when the Anime.js import is blocked
- No console errors
- No horizontal overflow
- No changes that fail the no-ai-slop evaluation

## Sources

The implementation will follow the Anime.js 4 documentation for timelines, staggering, text splitting, and scroll observers. Version 4.5.0 is pinned based on the package version and release information published by the Anime.js project.
