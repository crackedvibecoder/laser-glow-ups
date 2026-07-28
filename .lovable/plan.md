Three focused fixes, all presentation-only.

## 1. Urgency bar icon alignment
The clock icon in the top "Summer Special" bar sits above the text because the icon is `w-4 h-4` while the countdown text wraps to two lines on mobile, so `items-center` centers the icon vertically against a taller text block and it visually drifts.

- Bump the icon to `w-5 h-5` so it reads as part of the line.
- Add `leading-tight` to the countdown container so the text block hugs the icon.
- Ensure the flex row uses `items-center` (already there) and keep `shrink-0` on the icon.

## 2. Small heading legibility across the funnel
The card titles ("Razor Burn & Ingrown Hairs", "Chin & Upper Lip", "Free Consultation", "Your Treatment Plan", "Lasting Results", "Hear From Our Clients", etc.) all use `font-serif` (Playfair Display) at `text-xl` or smaller. Playfair is beautiful for large hero headings but hard to read at small sizes — the thin strokes lose definition.

Rule: **keep Playfair for large section headings (h2, `text-3xl`+), switch smaller card titles to Inter (sans-serif) for clarity.**

Changes in `src/pages/Index.tsx`:
- Pain-point cards (line 414): `text-xl font-serif` → `text-xl font-semibold tracking-tight` (sans)
- Before/after captions (lines 445, 452): `font-serif text-lg` → `text-lg font-semibold`, and bump the sub-caption to `text-base`
- How It Works step titles (line 496): `text-xl font-serif` → `text-xl font-semibold tracking-tight`
- "Hear From Our Clients" label (line 603): already an eyebrow — leave as-is
- FAQ triggers (already `text-lg font-serif`): keep serif since they read as questions and sit at `text-lg`, which is the size threshold where Playfair is still comfortable. If you'd rather match, we can also switch these — flag me.

Body copy bumps (a second pass on sizing):
- Card descriptions already at `text-base` — good.
- Booking helper line (642): `text-sm` → `text-base`
- Pricing "Was £895" line under card (584): stays `text-sm` (intentionally secondary)

## 3. Booking scroll anchor lands too high
The `#book` section currently uses `scroll-mt-24` (96px), which lands above the calendar iframe's actual clickable content. On mobile the GHL widget has ~150-200px of its own top padding before the date grid becomes tappable.

- Reduce top padding on the booking section and increase scroll offset so the click lands closer to the calendar's interactive area: change `section-padding-compact` + `scroll-mt-24` on the `#book` section to `scroll-mt-4 pt-2 pb-16`.
- Net effect: clicking the CTA scrolls further down, landing near the top of the calendar grid instead of above the widget's own header.

## Files touched
- `src/pages/Index.tsx` (only)

No design token, color, layout, or copy changes — just typography weights/families on small titles, one icon size, and the booking section's scroll offset.
