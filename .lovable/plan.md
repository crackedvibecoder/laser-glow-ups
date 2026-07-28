## Goal
Make the hero heading feel visually balanced on mobile while keeping the `Save £100` highlight intact and on its own line.

## Current state
- The hero `h1` is one continuous sentence: `Full-Body Laser Hair Removal — Save £100 This Summer`.
- On narrow viewports the browser wraps it unevenly (e.g. "Removal — Save" alone on a line, then "£100 This Summer"), which looks unbalanced.
- The `Save £100` highlight uses `rounded` (small radius) and sits inside the heading.

## Proposed changes
1. **Restructure the heading into explicit, balanced lines.**
   - Mobile: stack the headline as three balanced lines so no single line looks orphaned:
     ```
     Full-Body Laser Hair
     Removal — Save £100
     This Summer
     ```
   - Desktop: keep the headline as one flowing line (or two balanced lines) so it doesn't feel broken on wider screens.
   - Keep `Save £100` on its own line on mobile and with the white/blush highlight.
   - Keep `This Summer` in the gold script accent.

2. **Soften the highlight.**
   - Change the `Save £100` background from `rounded` to `rounded-lg` (or `rounded-xl`) so the pill feels softer and more premium.
   - Keep the white/blush background color as requested.

3. **Preserve everything else.**
   - No changes to the image placement, eyebrow text, CTA, location line, or surrounding sections.
   - No changes to the offer copy or pricing.

## Files to change
- `src/pages/Index.tsx` (hero heading only)

## Verification
- Build the project.
- Capture mobile and desktop screenshots of the hero to confirm the lines look balanced and the highlight radius is softer.