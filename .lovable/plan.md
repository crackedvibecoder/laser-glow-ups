## Plan: Reorder hero section layout

### Current state
The hero currently stacks as:
1. Eyebrow ("Medical-Grade Laser Hair Removal")
2. Main heading
3. SAVE £100 badge + price
4. CTA + location
5. Image (last)

### Change
Reorder the hero so the image sits **between the eyebrow and the main heading**:
1. Eyebrow ("Medical-Grade Laser Hair Removal")
2. Hero image (`leg-laser.jpg`)
3. Main heading ("Full-Body Laser Hair Removal This Summer")
4. SAVE £100 badge + "Was £895 — now £795"
5. CTA ("Claim Your £100 Discount →")
6. Location ("Bury, Manchester")

### Implementation
- Update `src/pages/Index.tsx` hero section only.
- Keep all existing text, styling, classes, and the `leg-laser.jpg` image unchanged.
- Keep the image compact on mobile (`h-48 sm:h-56 md:h-80`) so the CTA still lands above the fold on a 394px-wide viewport.
- On desktop, maintain the side-by-side split: text column left, image column right — but within the text column the internal order becomes eyebrow → image → heading → offer → CTA.

### Verification
- Run build.
- Capture mobile (394×840) and desktop screenshots to confirm the new order and that the CTA remains above the fold on mobile.