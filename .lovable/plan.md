## Fix: Remove blue outline from exit-intent "No thanks" button

### Problem
The "No thanks, I'll pay full price" button in the exit-intent popup shows a browser default blue focus outline/box (visible in the uploaded screenshot).

### Root cause
The dismiss button in `ExitIntentPopup` (inside `src/pages/Index.tsx`) is a native `<button>` without any focus-ring reset, so Chromium/Safari render their default blue `outline` when the element is focused.

### Change
Update the dismiss button classes in `src/pages/Index.tsx` to suppress the default blue focus ring while keeping a subtle, on-brand focus indicator for accessibility:

- Add `focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2` (or equivalent Tailwind focus tokens already used in the project).
- Keep existing text styling (`text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors mt-1 underline underline-offset-2`) unchanged.

### Files touched
- `src/pages/Index.tsx` — one className change on the "No thanks, I'll pay full price" button inside `ExitIntentPopup`.

### Out of scope
- No changes to popup copy, layout, trigger logic, or other buttons.
- No changes to the main CTA button styling.