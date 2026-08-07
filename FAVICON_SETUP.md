# Favicon Setup for Inked Attraction

## Overview

This Next.js application is configured to use favicons. The metadata is already set up in `src/app/layout.tsx`. You just need to provide the favicon files in the `public/` directory.

## Files Required in `public/` Directory

The following files need to be generated and placed in the `public/` folder:

```
public/
├── favicon.ico                    # Classic favicon (32x32)
├── favicon-96x96.png             # Standard favicon
├── favicon.svg                   # SVG favicon (optional, modern)
├── apple-touch-icon.png          # iOS home screen icon (180x180)
├── android-chrome-192x192.png    # Android home screen icon
├── android-chrome-512x512.png    # Android splash screen icon
├── site.webmanifest             # ✓ Already created
└── og-image.png                 # Social sharing image (1200x630)
```

## How to Generate

### Option 1: RealFaviconGenerator (Recommended)

1. Go to: https://realfavicongenerator.net/
2. Click "Select a favicon image"
3. Upload `public/images/logo.png` (or the IA monogram portion)
4. Customize if desired (should already be black/gold themed)
5. Generate the favicon
6. Download the favicon package (ZIP)
7. Extract all files to your `public/` directory
8. The generated `site.webmanifest` will override the one we created (which is fine)

### Option 2: Command Line (Node.js)

```bash
npm install -g favicons-cli
favicons public/images/logo.png --output public
```

Then delete the extra HTML file generated.

## After Setup

Your favicons will automatically work on:
- ✅ Browser tabs
- ✅ Bookmarks
- ✅ Browser history
- ✅ iOS home screen (when "Add to Home Screen" is used)
- ✅ Android home screen
- ✅ Social media sharing (Twitter, Facebook, etc.)
- ✅ PWA app icon

## Verification Checklist

After placing the favicon files:

1. **Clear browser cache** (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. **Hard refresh** the page (Ctrl+F5 or Cmd+Shift+R)
3. **Check browser tab** - you should see the IA logo as favicon
4. **Test on mobile** - visit the site on iOS/Android
5. **Test social sharing** - use OG image preview tools:
   - https://ogp.me/ 
   - https://www.opengraph.xyz/

## File Specifications

### favicon.ico
- Format: ICO (Windows icon)
- Sizes: 16x16, 32x32, 48x48 (multi-resolution)
- Should be a simplified IA monogram

### favicon-96x96.png
- Format: PNG
- Size: 96x96 pixels
- IA monogram on transparent background

### favicon.svg
- Format: SVG (vector)
- Scalable at any size
- Modern browsers prefer SVG

### apple-touch-icon.png
- Format: PNG
- Size: 180x180 pixels
- IA monogram (iOS will auto-round the corners)
- No transparent background (solid black/gold)

### android-chrome-192x192.png & 512x512.png
- Format: PNG
- Sizes: 192x192 and 512x512 pixels
- Used for Android home screen and splash screen

### og-image.png
- Format: PNG
- Size: 1200x630 pixels (recommended for social media)
- Black background with centered IA logo
- Optional subtle gold glow effect
- Used when sharing links on Twitter, Facebook, LinkedIn

## Current Configuration

The Next.js app is configured in `src/app/layout.tsx` with:

```typescript
icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    { url: "/favicon.svg", type: "image/svg+xml" },
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
}
manifest: "/site.webmanifest",
appleWebApp: {
  capable: true,
  statusBarStyle: "black-translucent",
  title: "Inked",
}
```

No additional HTML changes are needed for Next.js.

## Troubleshooting

### Favicon not showing?
- Clear browser cache completely
- Hard refresh (Ctrl+F5)
- Check browser console for errors
- Ensure files are in correct location (`public/` not `public/favicon/`)

### Wrong icon showing?
- Browser may be caching old favicon
- Delete browser cache and cookies for the site
- Try incognito/private window

### Mobile icon issues?
- iPhone: uses apple-touch-icon.png
- Android: uses android-chrome-192x192.png or 512x512.png
- Wait 24+ hours for Google to reindex (or test with different browser/device)

## Additional Resources

- Next.js Favicon Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata-icons-favicons
- Favicon Best Practices: https://web.dev/learn/design/icons-fonts/
- Web App Manifest Spec: https://www.w3.org/TR/appmanifest/
