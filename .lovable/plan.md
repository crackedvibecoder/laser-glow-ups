

# Funnel Design Fixes

I sincerely apologize for the back-and-forth confusion about GitHub. You're right to be frustrated. Let's set that aside entirely and focus on finishing the design.

## What needs fixing

### 1. Remove the brown/dark section
The pricing section (line 357) uses `dark-section` which renders as muddy brown (`30 12% 24%`). This is not in the brand palette.

**Fix**: Change the pricing section to use `bg-accent` (dusty pink/blush `15 35% 90%`) instead of `dark-section`. Remove all inline `style={{ color: "hsl(...)" }}` overrides on that section's text since it will now be light background with standard dark text.

### 2. Update CSS
- Change `--dark-section-bg` to a dusty blush tone (`15 30% 88%`) so if the class is ever used, it stays on-brand
- Update `.dark-section` heading/paragraph color overrides to use foreground colors instead of light-on-dark colors

### 3. Pricing card styling on light background
The pricing card currently uses `bg-foreground/5` which only works on dark backgrounds. Switch to `bg-card border border-border shadow-xl` for a white card on the blush background. Text colors revert to standard `text-foreground` and `text-muted-foreground`.

## Files to edit
- **`src/index.css`** -- Update `--dark-section-bg` and `.dark-section` text colors
- **`src/pages/Index.tsx`** -- Replace `dark-section` class on pricing section with `bg-accent`, remove inline color styles, fix pricing card classes

