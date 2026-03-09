

# Logo Padding Fix & Footer Privacy Links

## Changes

### 1. Fix logo cropping — add top padding and bottom spacing
The logo currently has `-my-14 md:-my-16` which crops too aggressively at the top. Reduce the negative top margin while keeping the bottom crop, and add a small bottom padding to the header container:
- Change `className="h-40 md:h-48 -my-14 md:-my-16 mx-auto"` → `className="h-40 md:h-48 -mt-10 md:-mt-12 -mb-14 md:-mb-16 mx-auto"`
- Change container `py-2` → `pt-4 pb-[5px]` to give breathing room at top and a 5px gap before the next section

### 2. Add privacy/terms links to existing footer
Add a small line of links to the existing footer section (around line 565-579) — standard practice for landing pages. A simple inline text approach: `Privacy Policy · Terms of Service` linking to `https://laserlocation.co.uk/privacy` and `https://laserlocation.co.uk/terms`. No separate box or section — just subtle footer links, which is the industry standard for funnels.

## Files to change
- **`src/pages/Index.tsx`**: Adjust logo margins/container padding (lines 123-127), add privacy/terms links to footer (around line 575)

