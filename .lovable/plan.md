

# Fix Thank-You Page — Reduce Top Weight, Tighten Mobile Layout

## Problem
The hero area (icon + heading + subtitle) consumes nearly half the 390px mobile viewport before users see any actionable content. The "What To Do Now" heading is also oversized.

## Changes in `src/pages/ThankYou.tsx`

1. **Shrink icon circle**: `w-20 h-20` → `w-14 h-14`, icon `w-10 h-10` → `w-7 h-7` (scale up on desktop with `md:` variants)
2. **Reduce top padding**: `py-16` → `py-8` on mobile, `md:py-16` on desktop. Switch `items-center` to `items-start` on mobile so content starts near the top
3. **Tighten hero spacing**: outer `space-y-10` → `space-y-6` on mobile (`md:space-y-8`), heading gap `space-y-3` → `space-y-2`
4. **Downsize "What To Do Now"**: from `font-semibold text-foreground` to `text-sm font-medium uppercase tracking-wide text-muted-foreground` — makes it a subtle section label rather than a competing heading
5. **Slightly reduce card internal spacing**: item spacing `space-y-5` → `space-y-4`, divider padding `pb-5` → `pb-4`, card padding stays `p-6 md:p-8` → `p-5 md:p-7`
6. **Keep icon sizes at `w-5 h-5`** for the step icons (they were bumped to `w-6 h-6` last pass — revert)
7. **Step titles stay `text-sm font-semibold`** (revert from `text-base`) — the dividers already provide enough visual separation

Net effect: the card with actionable steps is visible above the fold on mobile without scrolling.

## File modified
- `src/pages/ThankYou.tsx` — class adjustments only

