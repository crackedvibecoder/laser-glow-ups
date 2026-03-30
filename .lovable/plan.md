

# Make Exit Intent Popup More Impactful on Desktop

The popup is currently `max-w-md` (~448px) with modest sizing. On a 1103px desktop viewport it looks small and easy to ignore.

## Changes in `src/pages/Index.tsx` (lines 195–222)

1. **Increase popup size**: `max-w-md` → `max-w-lg` (512px), add more padding `p-8` → `p-10 md:p-12`
2. **Bigger £100 badge**: Increase from `text-3xl` → `text-5xl md:text-6xl`, make the pill larger with `px-8 py-4`
3. **Larger headline**: `text-2xl md:text-3xl` → `text-3xl md:text-4xl`
4. **Larger social proof text**: `text-base` → `text-lg`
5. **Bigger CTA button**: `py-3 text-base` → `py-5 text-lg tracking-wider`
6. **Add visual emphasis**: Gold gradient border on the dialog content (`border-2 border-primary/30`) and a subtle backdrop blur enhancement
7. **Add urgency element**: Include the countdown timer or "Limited spots this week" line above the CTA

## File modified
- `src/pages/Index.tsx` — exit intent popup markup only (lines 195–222)

