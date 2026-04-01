

# Thank-You Page + Pending Changes

You're right — the redirect URL is `https://offer.laserlocation.co.uk/thank-you` since that's your custom domain. Configure that in GoHighLevel as the post-booking redirect.

## Changes

### 1. Create thank-you page (`src/pages/ThankYou.tsx`)
- Route: `/thank-you`
- Clean confirmation page: "You're Booked!" heading, what-to-expect next steps, trust reassurance
- Placeholder for Meta Pixel `Schedule` event (ready to drop in your pixel ID later)
- No nav, minimal layout — consistent with the funnel aesthetic

### 2. Add route in `src/App.tsx`
- Add `/thank-you` route pointing to `ThankYou.tsx`

### 3. Reduce hero subheading size (`src/pages/Index.tsx`, line 311)
- `text-xl md:text-2xl` → `text-base md:text-lg` on the "Ditch the razor for good…" line
- Pushes the CTA button higher on mobile

### 4. Training page exit intent upgrade (`src/pages/Training.tsx`, lines 176–192)
- Scale popup from `max-w-md` to `max-w-lg`, add more padding (`p-10 md:p-12`)
- Bigger headline: `text-2xl` → `text-3xl md:text-4xl font-serif`
- Add a prominent badge or visual emphasis for "Limited Spots"
- Loss-aversion dismiss: add "No thanks, I'll miss out" styled link
- Larger CTA button with `py-5 text-lg`

### Files
- `src/pages/ThankYou.tsx` — new
- `src/App.tsx` — add route
- `src/pages/Index.tsx` — line 311 class change
- `src/pages/Training.tsx` — exit intent popup lines 176–192

No database changes.

