## Hero refinements — Laser Location offer page

### Goal
Swap the hero image to the leg-laser shot, tighten the text hierarchy, and make the £100 saving more immediately obvious without breaking the editorial aesthetic.

### Changes

1. **Replace hero image**
   - Swap `src/assets/practitioner-treatment.jpg` for `src/assets/leg-laser.jpg` in the hero section.
   - Keep the same rounded-2xl, object-cover styling and mobile/desktop heights.

2. **Reorder hero text**
   - Keep the eyebrow `"Medical-Grade Laser Hair Removal"` at the very top of the text block (it frames the offer).
   - Move `"Bury, Manchester"` to sit **below** the CTA button, so the headline → CTA flow is uninterrupted.

3. **Emphasise the £100 saving**
   - Add a small, high-contrast badge/pill directly under the headline (or just above the CTA) reading `"Save £100"`.
   - Use the existing primary gold token (`bg-primary`, `text-primary-foreground`) so it feels on-brand, not like a new colour.
   - Optionally add a tiny price line `"Was £895 — now £795"` under the badge for extra clarity.

4. **Preserve mobile "above the fold"**
   - Keep the current compact padding (`py-10 md:py-16`).
   - If the badge pushes the CTA down, slightly reduce headline margin or badge spacing so the CTA still appears on a typical mobile viewport.

5. **Verify**
   - Run a build check.
   - Capture mobile (394×840) and desktop screenshots to confirm the CTA remains visible, image renders correctly, and hierarchy feels balanced.

### What won't change
- No design-system colours, fonts, or button styles.
- No changes to the booking calendar, sticky bar, exit-intent popup, or other sections.
- The CTA button text stays exactly `"Claim Your £100 Discount"`.

### Recommendation
The leg-laser image is a stronger close-up treatment shot and will feel less generic than the current practitioner-treatment image. Moving the location below the CTA keeps the offer/action front-and-centre. The gold "Save £100" badge gives the discount the visual weight it deserves without cluttering the headline.