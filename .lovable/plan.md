
# Thank-You Page Simplification (Mobile-First)

## Goal
Make `/thank-you` feel lighter and more scannable by reducing copy volume (not enlarging elements).

## What to change

1. **Remove redundant heading layer**
   - Keep **“You’re Booked!”**
   - Shorten subtitle to one line: **“Quick next steps:”**
   - Remove the separate **“What To Do Now”** label (it adds visual noise)

2. **Convert each step to one concise line**
   - Keep the 3 icons, but remove paragraph text under each step
   - Use short, action-led lines:
     - **Add your slot to calendar**
     - **Check text/email for confirmation**
     - **15-min consultation · £100 discount applied**
   - This cuts the biggest source of text density

3. **Shorten the urgency copy**
   - Replace long sentence with:
   - **“Need to reschedule? Please tell us ASAP so your slot can be offered to someone else.”**

4. **Tighten the footer trust line**
   - Keep one short trust line only:
   - **“Laser Location · Bury, Manchester”**
   - Remove extra qualifier text to reduce bottom clutter

5. **Spacing tuned for scan speed**
   - Keep current compact top layout
   - Slightly increase row separation inside the card so each action reads as a distinct checklist item

## Technical details
- Update text content and classNames only in `src/pages/ThankYou.tsx`
- No routing, tracking, backend, or data changes
- Keep `fbq("track", "Schedule")` exactly as is

## File to update
- `src/pages/ThankYou.tsx`
