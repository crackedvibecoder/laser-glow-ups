## Fixes

### 1. Exit-intent popup text alignment
The exit-intent popup (`ExitIntentPopup` in `src/pages/Index.tsx`) has `text-center` on `DialogContent`, but the shared `DialogHeader` component enforces `sm:text-left`. On desktop, the popup title and description become left-aligned while the rest of the popup text stays centered.

**Change:** Add `className="text-center sm:text-center items-center"` to the `DialogHeader` inside `ExitIntentPopup` so all header text stays centered on every breakpoint.

### 2. Thank-you page next-steps wording
The current card says `15-min consultation · £100 discount applied`, which is misleading because the discount is only applied if/when the client purchases a package after the consultation.

**Change:** Update the third next-step line in `src/pages/ThankYou.tsx` to clarify the discount is reserved for the consultation / purchase step, e.g.:
`15-min consultation · £100 discount reserved for your treatment package`

No other popups, styling, or business logic will be changed.