# Inked Attraction Logo Setup

## Logo Asset Placement

The logo image needs to be saved to: `public/images/logo.png`

**Important**: The logo image provided (Inklogo.png) should be saved as PNG to maintain the transparent background and quality.

### Steps:
1. Download the logo image (Inklogo.png)
2. Save it to `public/images/logo.png`
3. Ensure it has a transparent background
4. Recommended: Keep the original dimensions or at least 800x1200px minimum

## Favicon Generation

Favicons have been configured in the metadata but need assets. Generate them using:

1. Go to https://realfavicongenerator.net/
2. Upload `public/images/logo.png`
3. Select just the IA monogram (the main letter portion)
4. Generate the favicon package
5. Download and extract to the `public/` directory

This will create:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `manifest.json` (optional)

## Open Graph / Social Sharing Image

Create `public/og-image.png` (1200x630px) with:
- Black background (#000000)
- Centered Inked Attraction logo
- Optional: subtle gold glow effect

## Brand Colors

The following colors are configured in `src/app/globals.css`:

- **Primary Gold**: #c9a227 (currently mapped to `--primary`)
- **Background**: #000000 (mapped to `--background`)
- **Text**: #f4f4f5 (mapped to `--foreground`)

For additional brand colors, add to globals.css:

```css
:root {
  --highlight-gold: #f2d27a;
  --dark-gold: #8c6a1e;
}
```

## Components Using the Logo

### 1. **Navbar** (`src/components/layout/Navbar.tsx`)
- Logo displays at 70px (desktop), 60px (tablet), 48px (mobile)
- Fade-in animation on page load
- Hover effect with scale and brightness increase

### 2. **Footer** (`src/components/layout/Footer.tsx`)
- Logo at 90px (desktop), 80px (tablet), 70px (mobile)
- Centered with "Tattoo & Piercing" and "Your Story. Our Art." taglines below
- 90% opacity

### 3. **Hero Watermark** (`src/components/brand/HeroWatermark.tsx`)
- Large watermark at 3-5% opacity
- Positioned behind hero content
- Provides visual depth without interfering with text

### 4. **Loading Screen** (`src/components/brand/LoadingScreen.tsx`)
- Animated logo on black background
- Fade in + scale animation (0.95 → 1)
- Soft gold glow pulse effect
- 2-2.5 second duration

## Testing

After placing the logo:

1. **Desktop**: Visit home page, navbar should display logo with smooth fade-in
2. **Mobile**: Check responsive sizing (48px on mobile)
3. **Scroll**: Logo should remain visible as navbar transitions to matte black
4. **Hover**: Subtle scale and brightness on logo hover
5. **Footer**: Logo should be centered with proper spacing

## Animation Details

All animations use Framer Motion with these properties:

- **Fade In**: 0.5s, easeOut
- **Scale**: 0.95 → 1.0, easeOut
- **Glow Pulse**: 2s, easeInOut, infinite

## Accessibility

All logo implementations include:
- `alt="Inked Attraction Tattoo & Piercing"`
- Semantic HTML structure
- Proper contrast ratios (AA compliant)
- Screen reader support

## Performance

- Logo uses Next.js `Image` component with `priority` on critical paths
- Lazy loading on non-critical sections (footer, watermark)
- Responsive image sizing with proper `sizes` attribute
- High-resolution image rendering
