--- 
name: insert-images-into-projectsgallery
description: Insert images into ProjectsGallery.tsx to display project media
metadata:
  type: project
--- 
## Summary

The ProjectsGallery component now supports displaying project media (images and videos) in the project cards. Here's how it works:

### Files Modified

1. **`src/data/portfolioData.ts`**
   - Added optional `image`, `video`, and `poster` fields to the `Project` interface.
   - Attached media to each project:
     - `brainwaves`: `brainwaves-loop.mp4` + `brainwaves-poster.jpg`
     - `smart-write`: `SmartWrite.jpg`
     - `heavenbound`: `heavenbound-loop.mp4` + `heavenbound-poster.jpg`
     - `ai-workflows`: `Semi-Local Personal AI Agent Workflows_Hermes, Muse, Claude Code, Boardy.png`
     - `vex-soccer`: `AV soccer bot.jpg`
     - `temposet`: `TempoSet.jpg`

2. **`src/data/portfolioData.ts`**
   - Added a resolver function to convert relative asset paths to hashed URLs:
     ```ts
     const asset = (filename: string) =>
       new URL(`../assets/${filename}`, import.meta.url).href;
     ```
   - Updated all media references to use the resolver.

3. **`src/assets/`**
   - Moved the 26MB original `HeavenBound Community Church Website.mp4` to `src/assets/_source/` to prevent it from being bundled.
   - Kept compressed versions (`heavenbound-loop.mp4`) in `src/assets/` for rendering.

4. **`src/components/ProjectsGallery.tsx`**
   - Updated the image slot to render media from the project object:
     ```tsx
     {project.video ? (
       <video src={project.video} poster={project.poster} autoPlay muted loop playsInline ... />
     ) : project.image ? (
       <img src={project.image} alt={...} ... />
     ) : null}
     ```

### How to Add More Images

To add images to the remaining projects:

1. **Drop the image file** into `src/assets/` (e.g., `src/assets/jetson-robot.jpg`).
2. **Update the data file** in `portfolioData.ts`:
   ```ts
   // Add to the project entry:
   image: "jetson-robot.jpg",
   ```

### How It Works

- **Vite resolves paths**: The resolver converts `../assets/foo.jpg` to a hashed URL like `/assets/foo-12345.jpg` at build time.
- **Media is copied**: The hashed files are copied into `dist/assets/` during the build.
- **No 404s**: The `<video>` and `<img>` tags now reference absolute paths that Vite resolves.

### Files Without Media

The following projects still lack media:
- `jetson-robot`
- `temi-kiosk`
- `tetrix-minimax`

Drop their images into `src/assets/` and I'll update the data file and component to display them.

### Key Benefits

- **Optimized builds**: Only the compressed, hashed versions of media files are bundled.
- **No 404s**: Media loads correctly in the browser.
- **Scalable**: Adding more images is just one line per project.

--- 
**Why:**
The gallery now displays project media as requested, with a clean, optimized build process. This ensures images and videos render correctly in the project cards.

**How to apply:**
1. Drop images into `src/assets/`
2. Update the data file with the image path
3. The gallery will automatically render them

--- 
[[insert-images-into-projectsgallery]]