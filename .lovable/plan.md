

# Fix Dense Urgency Bar on Mobile

The urgency bar currently renders "Spring Special — Save £100 · Offer ends in 12d 5h 30m" plus two clock icons all on one line at `text-sm`. On a 390px viewport this wraps awkwardly and feels cramped.

## Changes

### In `src/pages/Index.tsx`:

**1. Stack urgency bar on mobile**
- On mobile: two lines — "Spring Special — Save £100" on top, "Offer ends in Xd Xh Xm" below
- On desktop: keep single line as-is
- Remove the second Clock icon (redundant), keep just one

**2. Update CountdownTimer component**
- Split into two separate elements: a savings line and a countdown line
- On mobile (`md:` breakpoint): use `flex-col` so they stack; on desktop use `flex-row` inline

**3. Slight padding adjustment**
- Reduce vertical padding on mobile from `py-2.5` to `py-2` to keep it compact even with two lines

## File to modify
- `src/pages/Index.tsx` — urgency bar container and CountdownTimer return markup

