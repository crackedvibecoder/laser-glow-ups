

# Thank-You Page — More Instructional + Calendar Focus

## Changes in `src/pages/ThankYou.tsx`

### 1. Update subtitle to be action-oriented
- Change "We can't wait to meet you" → "Here's how to make sure you're all set"

### 2. Rework the "What Happens Next" steps
Replace current three items with:

1. **Calendar icon** — "Add it to your calendar" — "Check your email for a confirmation and tap 'Add to Calendar' so you don't forget your slot."
2. **Mail/MessageSquare icon** — "Keep an eye on your messages" — "You'll receive a confirmation with your appointment details — check your texts and email."  
   *(No specific phone number mentioned — keeps it generic)*
3. **Clock icon** — "Your consultation is 15 minutes" — "No pressure, no obligation. We'll assess your skin, answer questions, and apply your £100 discount."

### 3. Add urgency note
Below the steps card, add a small line: "Slots are limited — if you need to reschedule, please let us know as soon as possible so we can offer your spot to someone else."

### 4. Icon imports
Replace `Phone` with `CalendarPlus` and `Mail` (or `MessageSquare`) from lucide-react.

### File modified
- `src/pages/ThankYou.tsx`

