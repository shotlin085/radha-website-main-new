# Design System

## Source of Truth

The color, typography, spacing, and motion-timing rules below are **not invented for this
marketing site** — they're copied verbatim from RADHA's real, locked brand system, defined in
the product repo (`Souvik988/RADHA_UPGRADED_PROJECT_FILES`,
`ADMIN_DASHBOARD_DOCS/02_DASHBOARD_UI_DESIGN.md` §2) and shared with the mobile app and admin
dashboard. If that system changes, pull the update from there — don't drift independently.

## Color

| Token | Hex | Role |
|---|---|---|
| `--color-brand-600` | `#EA580C` | The vivid accent — icons, focus rings, brand mark, small bold UI. Not for solid fills carrying body-sized text (fails 4.5:1 contrast with white/cream at that scale). |
| `--color-brand-700` | `#9A3412` | Solid CTA fills, eyebrow labels, icon-on-tint chips — anywhere text-level contrast against a light surface is required. |
| `--color-brand-100` | `#FED7AA` | Soft tint chips/badges. |
| `--color-teal` | `#0F766E` | Sparing secondary accent — one info cue at most, never a primary color. |
| `--color-ink` / `--color-ink-muted` | `#1C1917` / `#57534E` | Text. Warm near-black, never pure black. |
| `--color-surface` | `#FFFBF5` | Page canvas. Warm cream, never flat white. |
| `--color-surface-raised` | `#FFFFFF` | Cards. |
| `--color-surface-inverted` | `#1A1714` | Dark sections (e.g. Business Pulse) — used sparingly, not the default. |
| `--color-hairline` | `#E7E1D4` | Borders/dividers. |
| `--color-success` / `--color-warn` / `--color-danger` | `#15803D` / `#B45309` / `#B91C1C` | Semantic states. |

Rule: orange is a small, confident accent, not a wash — "tints whisper, orange speaks." No
purple-blue gradients, no neon, no glassmorphism, no pure `#000`.

## Typography

Plus Jakarta Sans for both display and body (`src/lib/fonts.ts`), JetBrains Mono for every
number/label/eyebrow. No serif — that was an earlier draft of this pass and was wrong; the real
brand system uses one sans family throughout. Weight scale: `w800` page titles, `w700` section
headers, `w500` labels, `w400` body.

## Motion Primitives

| Component | Use for |
|---|---|
| `ScrollSequenceCanvas` | The 5 GSAP canvas-scrub hero chapters. Load-bearing — see its own file comments before touching. |
| `ScrollReveal` | Fade-up entrance for "lighter" Framer sections. |
| `StaggerGroup` / `StaggerItem` | Card grids, staggered entrance. |
| `TextReveal` | Word-level heading reveal — used by `SectionHeading` and the 5 hero `h1`/`h2`s directly. |
| `MagneticButton` | Pointer-pull on primary CTAs only (wired inside `Button.tsx`), mouse-only, off under reduced motion. |
| `AnimatedIcon` | Clip-path "traces in" reveal for a small number of meaningful icons (Label Intelligence cards, Capability Matrix checkmarks) — not every icon on the page. |
| `VerifyProgressRail` + `ProgressRailContext` | Desktop-only homepage wayfinding, one tick per hero chapter, pulses on chapter completion. |
| `MarqueeBand` | Film-credit text band (pure CSS `--animate-marquee` from the `@theme` block; frozen under reduced motion). One per page maximum. |
| `ManifestoBand` | Typographic title-card interstitial between the story chapters and the overview sections. |

Timing budget (from the real brand system): micro-interactions 120–200ms, section reveals
200–320ms, hard ceiling 400ms except one celebration beat (Mor's win pose on the final CTA),
which may run up to ~800ms.

Every primitive above reads `useReducedMotion()` (`src/components/motion/useReducedMotion.ts`)
and renders a static/instant fallback — no parallel reduced-motion logic anywhere else.

## Hero Canvas Crop Focal Points

`ScrollSequenceCanvas`'s `drawCover` crops each sequence's 16:9 photography to whatever the
section's box aspect ratio is — full-bleed `h-screen` on narrow phones crops far more
aggressively than desktop. Most sequences compose their subject near center and need nothing
extra, but two don't: `02-scan-product-truth` and `04-private-owner-dashboard` stage two (or
three) subjects spread across the frame with wide empty gaps between them, so a dead-center crop
on a narrow viewport can land entirely in the gap. Each `SequenceDef` in `src/lib/sequences.ts`
carries a `focalX` (0–1, default 0.5) used as the crop anchor in both the canvas draw and the
background poster's `object-position`, biased toward whichever subject is present throughout
most of that sequence. Desktop is effectively unaffected since its wider aspect ratio crops much
less to begin with.

## Cinematic Devices

- **Film frames:** every canvas story chapter gets `tablet:rounded-[2rem]` corners so the
  cream canvas shows through — each chapter reads as a projected frame, not a full-bleed band.
- **Chapter markers:** a mono `01 / 05` marker (`chapter` prop on `ScrollSequenceCanvas`),
  rendered `mix-blend-difference` so it auto-contrasts against any frame content.
- **Paper grain:** the body carries a static SVG-noise `background-image` at ~3.5% opacity —
  the brand system's own "warm cream, faint paper grain" canvas spec.
- **Header blend:** the wordmark, nav links, and hamburger are white with
  `mix-blend-difference`, auto-inverting over dark hero frames, cream sections, and the solid
  scrolled header bar alike. The orange CTA is excluded (it carries its own background).

## Mor

RADHA's real illustrated mascot (`radha_app/assets/v2/character/mor/` in the product repo).
Two art styles exist upstream — a simple "static" chibi set and a richer "scenes" set. Only the
"scenes" set is used here (`public/assets/mor/`: `hero-splash`, `scanning`, `search-think`,
`hero-win`) — it matches the brand's "confident, expressive, never childish" rule; the chibi set
reads younger than that and was deliberately not imported. Every Mor image ships with real
descriptive `alt` text and is never `aria-hidden` — it's meaningful content, not decoration.

## Responsive & Touch Targets

Full breakpoint audit (320/360/375/390/414/480/768/1024/desktop, portrait + landscape) covering
every route, nav, form, table, and carousel. Standards applied:

- **Touch targets:** every standalone interactive control (buttons, nav links, footer links,
  showcase CTAs) is ≥44×44px. Inline text links within a sentence (e.g. "Scroll the homepage" on
  `/showcase`) are exempt per WCAG 2.5.8's inline-text carve-out and intentionally left at their
  natural size.
- **Horizontal scroll:** `html { overflow-x: hidden }` in `app/globals.css` is a defensive,
  belt-and-suspenders rule. The only intentionally-scrollable descendants are the Capability
  Matrix table wrapper and the mobile card carousels (`LabelIntelligence`, `AudienceOverview`,
  `/showcase` before/afters) — each uses its own `overflow-x: auto` and is confirmed not to leak
  scroll to the document (`window.scrollX` stays `0` even when the wrapper itself scrolls).
- **Landscape short-viewport fix:** `ScrollSequenceCanvas`'s section is `h-screen` with a
  `min-h-[36rem]` floor. On short landscape viewports (mobile phones rotated, ~360–430px tall)
  100vh isn't enough room for a hero chapter's stacked copy (eyebrow + heading + paragraph + CTA
  row) under `justify-end`, so without the floor the top of the heading clips above the viewport.
  The floor is inert on every normal portrait or desktop viewport (100vh already exceeds 576px
  there) — verified no regression to the GSAP pin+scrub behavior at desktop widths.
- **Focus management:** `MobileNav`'s close button now returns focus to the hamburger trigger on
  click, matching the existing Escape-key behavior (previously only Escape did this; clicking the
  visible close button dropped focus to `<body>`).

## Known Issue

A React dev-mode console warning ("Only plain objects can be passed to Client Components from
Server Components") appears on every route, tied to `Icon.tsx` being used from both Server and
Client Component contexts. It predates this pass, does not fail `npm run build`, and no visual
or functional bug has been found tied to it in extensive manual testing. Worth a proper fix in a
future pass (likely: convert `Icon.tsx` to the same `children`-based API `AnimatedIcon.tsx`
already uses, instead of accepting a component reference as a prop).
