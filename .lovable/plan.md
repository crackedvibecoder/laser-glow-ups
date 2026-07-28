## Goal
Re-introduce imagery into the simplified hero section so it feels less text-heavy and has clearer visual hierarchy, without pushing the CTA below the fold on mobile.

## Current state
- `src/pages/Index.tsx` hero currently contains only: eyebrow, H1, location line, and CTA button.
- Local assets exist in `src/assets/`; `practitioner-treatment.jpg` is a strong, on-brand, editorial-style treatment-room shot.
- No storage buckets exist in this project, but the required images are already in the repo.

## Proposed changes

### 1. Hero layout update
- Switch the hero from a single centred text column to a mobile-first stacked layout:
  - **Mobile**: image first, then text + CTA, all above the fold.
  - **Desktop**: text-left / image-right split (or centred stacked if split feels too busy).
- Import and use `practitioner-treatment.jpg` as the hero image.
- Add descriptive `alt` text: "Laser hair removal treatment at Laser Location, Bury, Manchester."

### 2. Preserve copy and CTA
- Keep the existing eyebrow, H1, "This Summer" accent, location line, and "Claim Your £100 Discount →" button exactly as they are.
- Do not re-add the removed sub-paragraph or trust badges to the hero.

### 3. Mobile above-the-fold guardrails
- Use a compact image height (e.g. `h-48` / `max-h-[40vh]`) so the CTA remains visible on ~394×840 mobile viewports.
- Keep reduced vertical padding (`py-10 md:py-16`) from the previous simplification.
- Verify with a Playwright mobile screenshot after implementation.

### 4. Styling constraints
- Use the existing design tokens (primary, muted-foreground, font-serif, btn-gold-metallic).
- No hardcoded colours; no changes to the overall design system.
- Image rounded corners and subtle shadow to match premium editorial aesthetic.

## Files to modify
- `src/pages/Index.tsx` — hero section layout and image import.

## Verification
- Build passes.
- Playwright screenshot at 394×840 confirms headline + CTA are visible without scrolling.
- Desktop screenshot confirms the split layout is balanced and not cluttered.

## Open decision
If you prefer a different image, the other available local assets are:
- `arm-laser.jpg` — clinical arm treatment close-up.
- `leg-laser.jpg` — clinical leg treatment close-up.

My recommendation is `practitioner-treatment.jpg` because it shows the professional setting and the practitioner, which feels more premium and trustworthy as a hero image.