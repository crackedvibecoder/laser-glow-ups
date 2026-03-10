

## Plan: Replace Booking Calendar Embed

Replace the current GHL calendar embed (ID: `AOejqJ66RHJNQ7Tu6BAI`) with the new one (ID: `XFCIVqAZ7Ha6pnxEiKXH`) in `src/pages/Index.tsx`.

### Changes

**`src/pages/Index.tsx`** — Update the iframe `src` URL and `id` attribute:
- Change `src` from `AOejqJ66RHJNQ7Tu6BAI` to `XFCIVqAZ7Ha6pnxEiKXH`
- Update the iframe `id` to `WKJHfaDYyUDdQrbeGrlS_1773178006930`
- Keep current styling (100% width, no border, 800px min-height, scrolling allowed)

Note: The external `form_embed.js` script from the embed snippet is not needed since we're rendering the iframe directly in React.

