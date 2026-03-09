

# Integrate Two Videos into the Funnel

Two video files uploaded:
- `Video_19-01-2026_11_19_42.mp4` — 30s interview testimonial
- `Video_14-01-2026_14_05_14_1.mov` — 20s first treatment expectations

## Plan

### 1. Copy video files into project
- Copy both files to `public/videos/` with clean filenames (`testimonial.mp4`, `first-visit.mov`)
- Using `public/` because video files are large and shouldn't be bundled by Vite

### 2. Add "Your First Visit" video section (between How It Works and Reviews, ~line 365)
- New mini-section with heading "Your First Visit" and subtext like "See what to expect at your first session"
- `<video>` element: `autoPlay`, `muted`, `playsInline`, `controls`, no `loop`
- Styled: `max-w-2xl mx-auto rounded-2xl overflow-hidden border border-border`
- Uses `section-padding-compact` and `bg-accent` to visually separate from adjacent sections

### 3. Add testimonial video in Reviews section (above the iframe widget, ~line 376)
- `<video>` element with same attributes, placed before the reviews iframe
- Small label above like "Hear from our clients"
- Same container styling as above

### Files changed
- **`src/pages/Index.tsx`**: Add two `<video>` sections, no new imports needed (using public paths)

