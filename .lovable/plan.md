

# Add Images and Update Header

## What's changing

### 1. Black header with gold watermark logo
The logo header (line 120) currently has `bg-background` (light). Change to near-black (`bg-[hsl(30,10%,10%)]`) and swap the current Supabase-hosted logo with the uploaded `Laser_watermark.png` gold watermark. The gold logo on dark background matches the main laserlocation.co.uk site.

### 2. Add before/after images to the page
Use the relevant hair removal images (not tattoo removal ones) to add social proof. The images to include:
- `arm-laser.jpg` -- treatment in action
- `475915389_...jpg` -- practitioner treating a client (shows professionalism)
- `leg-laser.jpg` -- leg treatment in action
- `chin-laser-before-after.jpg` -- before/after result
- `laser-bikini-before-after.jpg` -- before/after result

Skip `brow-tattoo-removal.jpg`, `tattoo-before-after.jpg` as requested (tattoo removal, not relevant to this hair removal funnel).

### 3. Where the images go
Add a new "Results" or image gallery section between the "Pain Points" and "How It Works" sections. Display the before/after images (`chin-laser-before-after.jpg`, `laser-bikini-before-after.jpg`) as side-by-side pairs, and the treatment-in-action images (`arm-laser.jpg`, `leg-laser.jpg`, practitioner photo) in a grid to show professionalism and real results.

## Files to change
- **Copy 5 images** from `user-uploads://` to `src/assets/`
- **`src/pages/Index.tsx`**: Update header to dark bg, swap logo src to imported watermark, add new image gallery section with imported images
- **No CSS changes needed** -- the dark header uses inline Tailwind classes

