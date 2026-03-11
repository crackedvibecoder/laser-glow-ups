

## Plan: Remove Form Step Labels, Fix Social Proof, Privacy Policy Popup

### 1. Remove "Step X of 3" labels from form fields
Delete the `<label>` element showing "Step 1 of 3" etc. from the `LeadCaptureForm` component (around line 246-248). Remove the `step` property from the fields array as it's no longer needed.

### 2. Social Proof Toasts — clarify
These are **fake/simulated** notifications — not real bookings. They were added as a CRO tactic in the previous round. If you want them removed entirely, let me know. Otherwise they stay as-is (they only show on desktop).

### 3. Privacy Policy as a popup dialog
- Replace the external `<a>` link for "Privacy Policy" with a button that opens a `Dialog` containing the privacy policy content inline.
- Remove the "Terms of Service" link entirely (not strictly required for a landing page, and avoids sending traffic away).
- The dialog will use the existing `Dialog` component with a scrollable content area and close button.
- I'll add placeholder privacy policy text that you can replace with your actual policy content.

### Files changed
- `src/pages/Index.tsx` — all three changes

