

# Fix Video Sizing on Desktop

The videos currently use `max-w-2xl` (672px) containers but the videos themselves are `w-full` inside those containers. On desktop, the native video dimensions are likely much larger than intended for the layout.

## Changes

**`src/pages/Index.tsx`** — Constrain both video containers:
- Change `max-w-2xl` to `max-w-lg` (512px) on both video wrapper divs (lines 378 and 404)
- This keeps them prominent on mobile (where they'll still be full-width) but appropriately sized on desktop

This is a two-line change — just updating the max-width class on both video container divs.

