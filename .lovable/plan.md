## Training page polish — round 2

Three fixes, all mirroring what we already shipped on the offer page. No copy, offer, form, or layout changes.

### 1. Urgency bar — stop the awkward wrap
In `src/pages/Training.tsx`, the bar renders `"Limited spots — next cohort starts in {days}d {hours}h {minutes}m"` as a single string, so on mobile the countdown breaks across two lines and can leave "58m" stranded on its own line.

Fix:
- Wrap the countdown block (`{days}d {hours}h {minutes}m`) in `whitespace-nowrap` so the numbers always stay together on one line.
- Also wrap the "next cohort starts in" phrase + countdown together in an inline block so the line breaks in a natural place (between "spots —" and "next cohort starts in 3d 5h 58m") rather than mid-countdown.
- Keep the inline `Clock` icon, `text-base` size, and current colors.

### 2. Gold numbers — truly "shadow only"
Current `.text-gold-metallic` in `src/index.css` already dropped the stroke, but the `drop-shadow(0 0 0.5px …)` renders as a symmetric halo on every edge, which reads visually as a thin outline — that's what still looks like "both".

Fix:
- Replace the omnidirectional halo with a single **directional** drop-shadow: `drop-shadow(0 1px 0 hsl(30 25% 18% / 0.35))`. That's a soft shadow *underneath* the glyph only, no halo, no outline appearance.
- Everything else in the gradient stays exactly as-is. Applies site-wide (Index, Training, Thank You), same as before.

### 3. Body copy readability across the training page
The offer page got a clarity pass (small serif titles → Inter `font-semibold`, body bumps to `text-base`/`text-lg`). Some spots on `/training` still lag. In `src/pages/Training.tsx`:

- **Hero eyebrow** ("Professional Training · Bury…"): `text-sm` → `text-base`.
- **Hero sub-paragraph**: already `text-lg` — keep.
- **Trust badges under form** (VTCT / Insurance-Ready / 1,000+ / Small Class Sizes): `text-sm` → `text-base`.
- **All section eyebrows** ("Who It's For", "Our Courses", "Your Trainer", "The Process", "The Difference", "Training FAQ"): `text-sm` → `text-base`.
- **Course cards**: subtitle `text-base` keep; `priceNote` `text-sm` → `text-base`; card title `text-xl` keep but ensure it's `font-semibold` Inter (already is).
- **Trainer stat labels** ("Years Specialist", "Clients Treated", etc.): `text-xs` → `text-sm`.
- **Why Train With Us tiles**: title currently `text-base font-semibold` → bump to `text-lg font-semibold`; body already `text-base` — keep.
- **How It Works step titles**: already `text-xl font-semibold` — keep.
- **Form helper line** under submit ("No obligation…"): `text-xs` → `text-sm`.
- **Sticky desktop CTA**: keep as-is (desktop only, tight bar).
- **Privacy popup body**: `text-sm` → `text-base` for legibility.
- **Footer legal** (line 813+): if still `text-xs`, bump to `text-sm` (already scheduled in prior pass — verify).

Small-title serif → Inter clarity swap: already done in the previous pass across Who It's For / Courses / How It Works / Why Train With Us tiles. No further font-family changes needed — the remaining "hard to read at small sizes" issue is size, not family.

### Out of scope
- No copy rewrites, offer changes, image swaps, form logic, or GHL/calendar changes.
- No hero restructure.
- No changes to the gold gradient itself — only the shadow.

### Files touched
- `src/index.css` — swap the halo drop-shadow for a single directional one.
- `src/pages/Training.tsx` — urgency bar `whitespace-nowrap` fix + typography bumps listed above.
