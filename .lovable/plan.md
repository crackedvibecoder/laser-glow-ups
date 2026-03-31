

# Hero Section — Text Hierarchy & Alignment Consistency

## Problem
The hero has several text elements at similar sizes (kicker, location line, subheading all around `text-sm`/`text-base`/`text-lg`), making it hard to scan. Additionally, the hero copy is left-aligned while sections below (Social Proof, Pain Points, How It Works, etc.) are centered, creating inconsistency.

## Changes in `src/pages/Index.tsx`

### 1. Improve text hierarchy (left column, lines 500–539)

| Element | Current | Proposed |
|---|---|---|
| Kicker ("Medical-Grade…") | `text-sm` uppercase | `text-xs` uppercase — smaller to clearly subordinate it |
| H1 headline | `text-4xl md:text-5xl lg:text-6xl` | Keep as-is — this is the anchor |
| Location line | `text-base font-medium` | `text-sm text-muted-foreground` — demote to secondary info, drop emoji |
| Subheading | `text-lg text-muted-foreground` | `text-xl md:text-2xl` — increase to create clear second tier below h1 |
| Pricing badge | `text-3xl` for price | Keep — already distinct |
| Trust badges | `text-sm` | Keep — fine as tertiary |

This creates a clear visual ladder: **Kicker (xs) → H1 (5xl–6xl) → Subhead (xl–2xl) → Location/Trust (sm)**.

### 2. Center-align the hero content

Switch the hero from the current left-aligned two-column grid to a centered, stacked layout on mobile. On desktop, keep the two-column grid but center the text within the left column:

- Add `text-center lg:text-left` to the copy column
- Center the trust badges row on mobile: `justify-center lg:justify-start`
- Center the pricing badge on mobile: wrap with `flex justify-center lg:justify-start`

This matches the centered approach used by every other section on the page while keeping the desktop two-column layout intact.

## File modified
- `src/pages/Index.tsx` — hero text classes only (lines 500–539), no structural changes

