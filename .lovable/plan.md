## Plan: Funnel-wide text scale-up for readability

Keep the hero heading exactly as it is now. Focus only on scaling body copy and small text across the funnel so it's more readable and accessible on mobile.

### Changes to `src/pages/Index.tsx`

| Location | Current | New |
|---|---|---|
| Urgency/countdown bar | `text-sm` | `text-base` |
| Section eyebrows ("Sound Familiar?", "Real Results", "Simple Process", "What to Expect", "Limited Time", "What Our Clients Say", "Got Questions?") | `text-sm` | `text-base` |
| Pain-point card descriptions | `text-sm` | `text-base` |
| Before/after captions ("Before & after several sessions") | `text-sm` | `text-base` |
| How-it-works step descriptions | `text-sm` | `text-base` |
| Pricing feature list items | `text-sm` | `text-base` |
| Pricing disclaimer ("Save £100 when you book...") | `text-xs` | `text-sm` |
| Booking disclaimer ("No payment required · ...") | `text-xs` | `text-sm` |
| FAQ question triggers | `text-base` | `text-lg` |
| FAQ answers | `text-sm` | `text-base` |
| Final CTA trust badges (No payment required / Instant scheduling / Tailored) | `text-xs` | `text-sm` |
| Footer legal copy | `text-xs` | `text-sm` |
| Hero location line ("Bury, Manchester") | `text-sm` | `text-base` |

### Changes to `src/pages/ThankYou.tsx`
- "Add your slot to calendar" / "Check text/email..." / "15-min consultation..." lines: `text-sm` → `text-base`.
- Reschedule note: `text-sm` → `text-base`.
- Location footer: `text-xs` → `text-sm`.

### What stays the same
- All headings (`h1`, `h2`, `h3`) — hierarchy preserved.
- CTA button styling (`.btn-gold-metallic` uses `text-sm` uppercase which reads well as a button label).
- Hero heading, image, layout, colors, and spacing.
- Any `text-xs` labels used inside form inputs or micro-labels where a larger size would break layout.

### Verification
- `bun run build` for compile check.
- Mobile + desktop screenshots to confirm nothing wraps awkwardly and the page feels more readable.