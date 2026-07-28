## Plan: Fix hero heading line breaks so "Save £100" stays on one line

### Current state
The hero `h1` in `src/pages/Index.tsx` is wrapping on mobile in the wrong places, splitting the line as:
```
Full-Body Laser Hair
Removal — Save
£100 This Summer
```
The user only wants to guarantee that `Save £100` never breaks across lines.

### Change
1. In `src/pages/Index.tsx`, wrap the highlighted `Save £100` span with `whitespace-nowrap` and make it an inline-block so the white/blush background still renders correctly.
2. Use a non-breaking space between `Save` and `£100` (`Save&nbsp;£100`) as a fallback.
3. Keep the existing wording, gold script accent on `This Summer`, image placement, CTA text, and all styling untouched.

### Verification
- Run the build to confirm no TypeScript/Tailwind errors.
- Capture mobile and desktop screenshots of the hero to confirm `Save £100` appears on a single line and the overall fold still looks correct.

### Files to edit
- `src/pages/Index.tsx` (hero `h1` only)