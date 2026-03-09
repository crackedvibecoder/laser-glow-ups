

# Fix Logo Bottom Padding

The bottom negative margin (`-mb-14 md:-mb-16`) is too aggressive, pulling the logo too close to the border. Increase the container's bottom padding from `5px` to `14px` to add visible breathing room below the logo.

## Change
- **`src/pages/Index.tsx` line 123**: Change `pb-[5px]` → `pb-3.5` (14px) on the header container

