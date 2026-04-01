

# Thank-You Page — Better Spacing & Scannability

## Problem
The three action items inside the card are dense — `space-y-3` with `text-sm` throughout, all crammed into one card with `p-6`. It reads as a wall of text on mobile (390px).

## Changes in `src/pages/ThankYou.tsx`

1. **Increase spacing between items**: `space-y-3` → `space-y-5` inside the steps list, and add a subtle `border-b border-border pb-5` divider on the first two items so each step is visually distinct
2. **Increase card padding**: `p-6` → `p-6 md:p-8`
3. **Bump icon size**: `w-5 h-5` → `w-6 h-6` so icons anchor each row more clearly
4. **Bump title size in each step**: `text-sm font-medium` → `text-base font-semibold` for the step headings — creates better contrast against the `text-sm` description text
5. **Increase outer spacing**: `space-y-8` → `space-y-10` on the main container for more breathing room between the hero, card, and footer text

No structural or content changes — just spacing and size tweaks to improve scannability.

## File modified
- `src/pages/ThankYou.tsx` — class adjustments only

