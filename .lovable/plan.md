## Training page optimisations

Bring `/training` in line with readability improvements on the offer page, plus a hero cleanup. Copy, offer, forms, and calendar untouched.

### 1. Gold numbers (`src/index.css`)
Simplify `.text-gold-metallic`:
- Keep the gold gradient exactly as-is.
- Remove one of the two drop-shadows so only a **single faint dark-brown shadow** remains for edge definition.
- No `-webkit-text-stroke`.

This applies site-wide (Index, Training, Thank You).

### 2. Training hero cleanup (`src/pages/Training.tsx`)
- **Move the 4 trust badges** (VTCT Accredited · Insurance-Ready · 1,000+ Clients Treated · Small Class Sizes) out of the left copy column and **place them below the enquiry form** in the right column, keeping the same badge styling.
- Hero copy column becomes: eyebrow + H1 + short sub-paragraph only — much lighter.
- No layout/grid change to the two-column hero.

### 3. Remove the "Social Proof Strip" section
Delete the white stat strip section (`1,000+ · 6+ · 5★ · VTCT`) that sits directly under the hero. User doesn't like its design and the same stats are already covered by the trainer section + badges.

### 4. Urgency bar — fix clock alignment
Move a single `Clock` icon **inside** the first `<span>` of `CountdownTimer` so it flows inline. Remove the two outer `Clock` elements that currently sit outside the multi-line text. Bump bar text `text-sm` → `text-base`.

### 5. Body copy size + font clarity bump
Match Index optimisations:
- Section intro paragraphs (Who It's For, Our Courses, Why Train With Us, Trainer bio): default → `text-lg`.
- Card body descriptions (Who It's For, Course highlights, Why Train With Us, How It Works step descriptions), course subtitle, course duration line, final CTA paragraph: `text-sm` → `text-base`.
- FAQ trigger: `text-base` → `text-lg`; FAQ answer: `text-sm` → `text-base`.
- Footer legal paragraph: `text-xs` → `text-sm`.
- Small card `h3` titles (Who It's For, Courses, How It Works steps, Why Train With Us tiles): swap `font-serif` → `font-semibold` (Inter) for clarity at small sizes. Section `h2`s and hero `h1` **keep** `font-serif`.

### 6. `#enquire` anchor snap position
Add `scroll-mt-4` on the final `#enquire` section so mobile CTA taps land closer to the form card, not above the section padding.

### Out of scope
- No copy rewrites, no offer/pricing changes, no image swaps.
- No changes to forms, lead router, exit popup, sticky CTAs, or course data.
- No changes to hero headline wording or the two-column hero grid.

### Files touched
- `src/index.css` — gold-number shadow simplification.
- `src/pages/Training.tsx` — hero badge move, social-proof strip removal, urgency bar icon, typography bumps, `#enquire` scroll margin.
