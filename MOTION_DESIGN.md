# Inked Attraction — Motion Design System

## Overview

This document outlines the comprehensive motion and animation system implemented across the Inked Attraction website. All animations are designed to be elegant, purposeful, and performance-optimized while respecting user accessibility preferences.

---

## Design Principles

Every animation adheres to these core principles:

- **Minimal**: Only animate when necessary to improve UX
- **Elegant**: Smooth, refined easing curves and timing
- **Purposeful**: Each animation serves a function (draw attention, provide feedback, improve navigation)
- **Performant**: GPU-accelerated transforms, respects reduced-motion preferences
- **Accessible**: WCAG compliant, keyboard navigation friendly
- **Responsive**: Works seamlessly across all screen sizes

---

## Motion System Architecture

### Easing Curves

All animations use carefully chosen easing functions for a premium feel:

```typescript
const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94],  // Bezier for ease-in-out
  spring: [0.22, 1, 0.36, 1],        // Bouncy, natural motion
  expo: [0.16, 1, 0.3, 1],           // Fast entrance, slow exit
  back: [0.68, -0.55, 0.265, 1.55],  // Overshoot for emphasis
};
```

### Timing Guidelines

- **Hover interactions**: 150–250ms
- **Click/tap feedback**: 100–150ms
- **Section reveals**: 400–700ms
- **Hero entrance**: 800–1200ms
- **Scroll transitions**: Based on viewport trigger

---

## Component Animations

### Hero Section (`src/components/home/Hero.tsx`)

**Features:**
- Staggered text reveals (heading, subheading, CTA)
- Mouse-responsive background parallax
- Floating accent orb with breathing animation
- Animated scroll-down indicator
- Smooth 3D perspective on hero image

**Timing:**
- Text enters: 0.3s–0.7s staggered
- Background parallax: Continuous based on mouse position
- Floating animation: 8s loop
- Scroll indicator: 2.5s bounce loop

**Code:**
```typescript
// Staggered text animation
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
```

---

### Stats Section (`src/components/home/Stats.tsx`)

**Features:**
- Animated number counters (from 0 to final value)
- Pulse glow effect around each stat
- Animated divider lines (scaleX reveal)
- Counter numbers scale and pulse slightly
- Staggered stat entry

**Timing:**
- Counter animation: 1.2s
- Pulse glow: 2s loop
- Divider reveal: 0.6s
- Stat stagger: 80ms between each

**Interactions:**
```typescript
// Animated counter with pulse
<motion.span
  animate={{
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    repeatDelay: 2,
  }}
>
```

---

### Artist Cards (`src/components/artists/ArtistCard.tsx`)

**Features:**
- Lift on hover (translate Y: -8px)
- Image zoom on hover (1.08x scale)
- Gradient overlay fade
- Role text pulse animation
- Underline reveal on hover
- Shadow enhancement

**Timing:**
- Hover lift: 300ms
- Image zoom: 400ms
- Underline reveal: 300ms
- Initial entrance: 500ms

**Hover Effects:**
```typescript
whileHover={{
  y: -8,
  boxShadow: "0 24px 48px rgba(212, 175, 55, 0.15)",
}}
```

---

### Gallery Grid (`src/components/gallery/GalleryGrid.tsx`)

**Features:**
- Staggered item entrance (50ms between items)
- Image zoom on hover (1.08x)
- Title fade-in on hover
- Smooth shadow transitions
- Favorite button scale animation
- Heart icon pulse on favorite

**Timing:**
- Item entrance: 500ms staggered
- Image zoom: 400ms ease-out
- Shadow transition: 300ms
- Heart pulse: 300ms

**Scroll Reveal:**
```typescript
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{
  duration: 0.5,
  delay: index * 0.05,
}}
```

---

### Styles Preview (`src/components/home/StylesPreview.tsx`)

**Features:**
- Card hover lift with shadow
- Image zoom on hover
- Gradient overlay enhancement
- Title color interpolation (primary gold)
- Underline reveal
- Explore label fade-in
- Border color transition

**Timing:**
- Card lift: 300ms
- Image zoom: 400ms
- Title color: 200ms
- Underline reveal: 300ms
- Label fade: 300ms

**Hover State:**
```typescript
whileHover={{
  boxShadow: "0 20px 40px rgba(212, 175, 55, 0.15)",
  borderColor: "hsl(var(--primary))",
}}
```

---

### Testimonials (`src/components/home/Testimonials.tsx`)

**Features:**
- Star rating animation (spin + scale reveal)
- Card lift on hover
- Quote text fade-in
- Author name fade-in
- Staggered star animation
- 100ms delays between elements

**Timing:**
- Stars: 400ms with 50ms stagger
- Quote text: 500ms delay 0.3s
- Author: 500ms delay 0.4s
- Card entrance: 500ms

**Star Animation:**
```typescript
initial={{ scale: 0, rotate: -180 }}
whileInView={{ scale: 1, rotate: 0 }}
transition={{
  duration: 0.4,
  delay: 0.2 + i * 0.05,
}}
```

---

### Social Links (`src/components/ui/social-links.tsx`)

**Features:**
- Scale hover effect (1.1x)
- Icon rotation animation (subtle swing)
- Continuous rotation loop (3s interval)
- Color and border transition
- Tap scale feedback (0.95x)

**Timing:**
- Hover scale: 200ms
- Tap scale: 200ms instant
- Icon rotation: 500ms every 3s

**Interaction:**
```typescript
whileHover={{
  scale: 1.1,
  borderColor: "hsl(var(--primary))",
}}
whileTap={{ scale: 0.95 }}
```

---

### CTA Banner (`src/components/ui/cta-banner.tsx`)

**Features:**
- Staggered text entrance
- Background glow fade-in
- Button entrance with delay
- Scroll-triggered animations
- Button hover scale

**Timing:**
- Eyebrow: 500ms delay 0.1s
- Title: 700ms delay 0.2s
- Subtitle: 700ms delay 0.3s
- Button: 600ms delay 0.4s

**Entrance Pattern:**
```typescript
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.3 }}
```

---

## Global Interactions

### Custom Cursor (`src/components/ui/CustomCursor.tsx`)

**Features:**
- Follows mouse position with smooth interpolation
- Scales up and shows label on hoverable elements
- Shows "Explore" for links, "Click" for buttons
- Minimal 100ms duration for smooth tracking
- Hidden on mobile/tablet

**Implementation:**
```typescript
animate={{
  x: mousePosition.x - 8,
  y: mousePosition.y - 8,
}}
transition={{ duration: 0.1, ease: "easeOut" }}
```

### Scroll Progress (`src/components/ui/ScrollProgress.tsx`)

**Features:**
- Horizontal gradient bar at top of page
- Scales proportionally to scroll position
- Gold gradient (primary to semi-transparent)
- Smooth, continuous animation
- Fixed position overlay

**Animation:**
```typescript
style={{ scaleX: progress / 100 }}
originX={0}
transition={{ ease: "easeOut" }}
```

---

## Motion Presets

All motion presets are centralized in `src/lib/motion.ts`:

### Entrance Animations

- **fadeUp**: Opacity + Y translate (classic scroll reveal)
- **blurReveal**: Fade + blur filter transition
- **scaleReveal**: Opacity + scale from 92%
- **slideInLeft**: X translate from left
- **slideInRight**: X translate from right

### Interactive Animations

- **buttonHover**: 1.05x scale, 250ms
- **buttonTap**: 0.98x scale, 100ms
- **cardHover**: Y translate -8px, 300ms
- **cardShadow**: Box-shadow enhancement

### Ambient Animations

- **shimmer**: Background position sweep (3s loop)
- **floatingAnimation**: Gentle Y bobbing (4s loop)
- **pulseGlow**: Radial glow pulse (2s loop)

### Container Animations

- **staggerChildren**: Manages child stagger timing
- **textReveal**: Individual text element animation

---

## Accessibility

### Prefers-Reduced-Motion Support

All animations respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Keyboard Navigation

- All interactive elements support keyboard focus
- Custom cursor disabled on mobile
- Animations don't interfere with tab order
- Focus states remain visible

### Screen Reader Support

- Animations don't convey essential information
- `aria-label` and semantic HTML preserved
- `role` attributes appropriate
- No animation-only content

---

## Performance Optimization

### GPU Acceleration

All animations use transform and opacity only:

```typescript
// ✅ GPU accelerated
whileHover={{ scale: 1.05, y: -8 }}

// ❌ Avoid (causes reflow)
whileHover={{ width: 400, height: 400 }}
```

### Frame Budget

- Target 60 FPS on all devices
- Durations: 200–1000ms (avoid excessive animations)
- Stagger delays: 50–100ms between items
- Continuous loops: 2–8s duration

### Lazy Loading

- Images use `loading="lazy"`
- Heavy animations trigger on viewport entry
- Scroll listeners use passive event handlers
- Motion animations use `once: true` on viewport

---

## Testing Checklist

### Desktop Testing
- [ ] Hero entrance animations play on page load
- [ ] Mouse-responsive parallax works smoothly
- [ ] Custom cursor appears and follows correctly
- [ ] Scroll progress bar advances smoothly
- [ ] All hover states respond immediately

### Mobile Testing
- [ ] Animations work without janking
- [ ] Custom cursor is hidden
- [ ] Touch feedback is immediate (no 300ms delay)
- [ ] Scroll animations trigger correctly
- [ ] Reduced-motion preference respected

### Accessibility Testing
- [ ] Enable "Reduce motion" setting
- [ ] Verify animations still work (reduced)
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces content

### Performance Testing
- [ ] Lighthouse performance > 85
- [ ] First Contentful Paint < 2s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No jank on scroll (60 FPS target)
- [ ] Mobile performance acceptable

---

## Common Animation Patterns

### Scroll-Triggered Entrance

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, ease: easing.spring }}
/>
```

### Hover Scale with Shadow

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  animate={{ boxShadow: "..." }}
/>
```

### Staggered Children

```typescript
<motion.div
  initial="hidden"
  whileInView="show"
  transition={{ staggerChildren: 0.1 }}
>
  {items.map((item) => (
    <motion.div key={item} variants={itemVariants} />
  ))}
</motion.div>
```

---

## Customization

### Adjusting Timing

Edit durations in `src/lib/motion.ts`:

```typescript
export const fadeUp = {
  transition: { duration: 0.55, ease: easing.spring }, // Change 0.55
};
```

### Adjusting Easing

Create new easing curves in motion.ts and apply to components:

```typescript
const customEasing = [0.17, 0.67, 0.12, 0.95];
transition={{ ease: customEasing }}
```

### Disabling Animations

For specific users or conditions:

```typescript
if (prefersReducedMotion) {
  return <div>{children}</div>; // Skip animation wrapper
}
```

---

## Resources

- **Framer Motion**: https://www.framer.com/motion/
- **Easing Curves**: https://easings.net/
- **Web Animation Performance**: https://web.dev/animations/
- **Accessibility**: https://www.w3.org/WAI/

---

## Summary

The motion system creates a premium, interactive experience that feels comparable to industry leaders like Apple, Linear, and Stripe. Every animation is purposeful, performant, and accessible, elevating the Inked Attraction brand through refined micro-interactions and cinematic macro-sequences.
