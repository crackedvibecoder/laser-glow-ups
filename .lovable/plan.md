

# Embed GHL booking calendar inline instead of redirect

## Approach
After the opt-in form is submitted, instead of `window.open()` to the external booking URL, swap the form view to show an embedded iframe of the GHL calendar. User stays on your domain with a clean URL.

## Changes to `src/pages/Index.tsx`

1. **Remove the `window.open()` redirect** (currently in the form submit handler around line 66)
2. **After form submission**, transition the UI to show the GHL booking iframe embedded inline where the form was, or in a full-width section below
3. **Iframe**: `<iframe src="https://api.leadconnectorhq.com/widget/booking/AOejqJ66RHJNQ7Tu6BAI" style="width:100%; min-height:600px; border:none;" />`
4. **Also load the GHL embed script** (`https://link.msgsndr.com/js/form_embed.js`) via a `useEffect` to ensure proper rendering
5. Keep the confirmation message / voucher code visible alongside or above the calendar

This way the flow is: Fill form → See confirmation + embedded calendar on the same page → Book directly. Clean URL throughout.

