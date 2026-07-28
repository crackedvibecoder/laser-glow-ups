## Tag calendar bookings with a stable funnel identifier

Right now the GHL booking iframe on `/` (offer page) only forwards whatever UTMs are already on the URL. Visitors without UTMs (direct, organic, QR, word-of-mouth) book through the same calendar ID used elsewhere and are indistinguishable in GHL.

Fix: append **hardcoded, season-neutral** UTM defaults to the iframe URL so every booking from this funnel is identifiable, while still preserving any real ad UTMs.

### Change

In `src/pages/Index.tsx` (the GHL booking iframe, currently around line 638), build the src with a small helper that merges the incoming query string with these defaults:

- `utm_source` — only set if missing → `direct`
- `utm_medium` — only set if missing → `funnel`
- `utm_content` — **always** overwritten → `offer-funnel`
- All other incoming params (utm_campaign, gclid, fbclid, etc.) pass through unchanged.

Resulting behaviour:

| Visitor arrival | What GHL sees |
|---|---|
| Meta ad: `?utm_source=facebook&utm_medium=cpc&utm_campaign=summer` | `utm_source=facebook`, `utm_medium=cpc`, `utm_campaign=summer`, `utm_content=offer-funnel` |
| Direct / organic (no UTMs) | `utm_source=direct`, `utm_medium=funnel`, `utm_content=offer-funnel` |

`utm_content=offer-funnel` is the constant tag that identifies "this funnel" regardless of season. If the page pivots to spring/winter later, the tag doesn't need to change — it always means "the current offer page funnel".

### Training page

`src/pages/Training.tsx` has no calendar iframe — it uses the enquiry form only, which already sends `page: window.location.href` and `formName: "Website contact form"` via the lead router. So GHL/Discord/Sheet already know a lead is a training-page enquiry. **No calendar change needed on `/training` today.**

If a booking calendar is later added to `/training`, the same helper should be used with `utm_content=training-offer-funnel`.

### Out of scope
- No calendar ID change, no design/layout change.
- No changes to the lead router or the enquiry forms.
- No changes to `/training` (no iframe there).

### Files touched
- `src/pages/Index.tsx` — replace the inline template-string iframe `src` with a small `buildBookingSrc()` helper that merges `window.location.search` with the defaults above.
