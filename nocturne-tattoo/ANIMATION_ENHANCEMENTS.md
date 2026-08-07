# Premium Animation Enhancements — Inked Attraction

This document outlines all premium micro-interactions and macro-interactions implemented throughout the Inked Attraction homepage.

## Overview

The homepage has been transformed into a premium, interactive experience with elegant, purposeful animations that enhance usability, reinforce hierarchy, and create a memorable user experience without distraction.

---

## 1. MICRO-INTERACTIONS

### Navigation (`components/redesign/Nav.tsx`)
- **Animated underlines** on nav links with scaleX reveal on hover
- **Glass morphism** background with opacity transform on scroll
- **Smooth transitions** between nav states
- **Logo hover effect** with scale animation
- **Scroll-aware behavior** with dynamic backdrop blur opacity

### Buttons (`components/redesign/HeroButton` & `MagneticButton`)
- **Magnetic hover effect** - cursor attraction with motion values
- **Scale transitions** on hover (1.05x) and tap (0.98x)
- **Gradient borders** with glow effect on hover
- **Ripple/glow animation** using box-shadow transitions
- **Smooth spring physics** for natural momentum

### Links (`components/redesign/AnimatedLink`)
- **Underline reveal** animation with scaleX transform
- **Color interpolation** on hover states
- **Subtle translate animation** on ghost links
- **Arrow icon appear/disappear** with smooth transitions

---

## 2. MACRO-INTERACTIONS

### Hero Section (`components/redesign/HeroSplit`)
- **Cinematic entrance sequence** with staggered text reveals
- **Multi-child stagger animation** using variants (0.12s between each element)
- **Floating background elements** with continuous floating animation
- **Parallax scroll effect** on background gradient
- **Card lift on hover** with shadow transitions
- **Image zoom on hover** with smooth scale (1.04x)
- **Spring easing** for natural, organic motion

### Section Reveals (`PortfolioShowcase`, `FeatureSpotlight`, `TestimonialsWall`)
- **Staggered fade + translate** revealing on scroll
- **Scale reveal** (scaleY: 0.96 → 1) with blur effect
- **Blur-to-sharp transitions** using filter animations
- **Dynamic masking** using clipPath where applicable
- **Scroll-triggered animations** with `whileInView` and viewport tracking

### Cards (`FeatureSpotlight`, `PortfolioShowcase`, `TestimonialsWall`)
- **Soft lift on hover** (y: -8px)
- **Dynamic shadows** that grow on hover (0 → 40px blur, 0 → 0.08 opacity)
- **Gradient border reveal** using `whileHover` background opacity
- **Image zoom** (1.08x scale on hover)
- **Icon animation** with rotation and scale

---

## 3. SCROLL INTERACTIONS

### ScrollProgress Component (`components/redesign/ScrollProgress.tsx`)
- **Top progress bar** showing scroll completion
- **Gradient color** from gold to amber
- **Scroll indicator dot** that pulses and fades in
- **Respects `prefers-reduced-motion`**

### Parallax Effects (`HeroSplit`)
- **useScroll + useTransform** for smooth parallax
- **Background moves slower than scroll** (0 → -80px at 0-500px scroll)
- **Applies to all floating elements**

### Section Animations
- **Fade + translate on entry** (y: 24px → 0)
- **Staggered children** with 0.08-0.12s delays
- **Once: true** to prevent re-triggering
- **Amount: 0.2-0.3** for optimal trigger points

---

## 4. TYPOGRAPHY ANIMATIONS

### Hero Text (`HeroSplit`)
- **Character stagger reveal** with custom variants
- **Delay per element** (0.1s base + 0.12s per child)
- **Blur and y-translate** combined for elegance
- **Spring easing** for natural feel

### Section Headings
- **Fade + lift animation** on scroll trigger
- **Duration: 0.6s** with spring easing
- **Viewport: { once: true, amount: 0.3 }**

---

## 5. IMAGE ANIMATIONS

### Portfolio Cards
- **Slow floating** (y: [0, -20, 0] over 5s)
- **Gentle zoom on hover** (1.1x scale)
- **Hover mask/overlay** with opacity fade
- **Shadow expansion** on hover

### Hero Featured Card
- **Card lift** (y: -12px) on hover
- **Shadow expansion** (40px → 80px blur)
- **Image zoom** (1.04x scale)
- **GPU-accelerated** using transform

---

## 6. ICON ANIMATIONS

### Feature Icons (`FeatureSpotlight`)
- **Gentle floating** using transform animation
- **Scale on hover** (1.2x)
- **Rotation animation** (0 → 8deg)
- **Color gradient** from amber to amber-700

### Nav Links
- **Arrow icon appear** on ghost link hover
- **Smooth x-translate** from -8px to 0
- **Timing: 0.3s** with spring easing

---

## 7. BACKGROUND EFFECTS

### Ambient Motion (`TestimonialsWall`, `FeatureSpotlight`)
- **Floating orbs** with y + x animation
- **Duration: 4-8s** for subtle, continuous motion
- **Blur: 3xl** for soft, glowing appearance
- **Opacity: 0.1-0.3** for premium aesthetic

### Marquee Gradient Fades
- **Fade edges** using ::before and ::after pseudo-elements
- **Gradient from white to transparent**
- **No animation of the gradient itself**
- **Pure CSS for performance**

### Custom Cursor Shadow
- **Mix-blend-mode: multiply** for natural blending
- **Gold color** matching design tokens
- **Ring + dot** design

---

## 8. INTERACTIVE FORMS (Footer)

### Email Input
- **Animated focus state** with ring shadow
- **Transform on focus** (boxShadow glow)
- **Smooth color transitions** (150-200ms)

### Subscribe Button
- **Loading state** with shimmer animation
- **Success state** with checkmark
- **Background gradient** slide animation during loading
- **Disabled state** while processing

---

## 9. CUSTOM INTERACTIONS

### Custom Cursor (`components/redesign/CustomCursor.tsx`)
- **Desktop only** (hidden on mobile)
- **Magnetic attraction** to interactive elements
- **Size scaling** (12px → 30px) on element hover
- **Opacity fade** with size increase
- **Ring + dot design** in gold color
- **Respects `prefers-reduced-motion`**

### Magnetic Button (`MagneticButton`)
- **useMotionValue** for smooth tracking
- **Cursor-following** with 6px damping
- **Scale based on x position** (0.98 → 1.02)
- **Glow on hover** with gold shadow
- **Loading state** support

---

## 10. ACCESSIBILITY & PERFORMANCE

### Respects User Preferences
- **useReducedMotion()** check on all animations
- **Conditional animation** based on system setting
- **Graceful fallback** to instant states

### GPU Acceleration
- **Transform + opacity only** for performance
- **will-change: transform** on animated elements
- **translateZ(0)** for GPU promotion
- **backface-visibility: hidden** for smoothness

### Focus States
- **Outline: 2px solid gold** on :focus-visible
- **Outline-offset: 2px** for clarity
- **Smooth transitions** on focus

### Performance Optimizations
- **Lazy load CustomCursor** (dynamic import)
- **Motion values** for efficient animations
- **useTransform** for computed values
- **No layout thrashing**

---

## 11. TIMING & EASING

### Consistent Easing Across Site
```
- Hover: 150–250ms
- Click: 100–150ms
- Section reveal: 400–700ms
- Hero entrance: 800–1200ms
```

### Easing Functions
```javascript
smooth: [0.25, 0.46, 0.45, 0.94],
spring: [0.22, 1, 0.36, 1],
expo: [0.16, 1, 0.3, 1],
back: [0.68, -0.55, 0.265, 1.55],
```

---

## 12. RESPONSIVE BEHAVIOR

### Mobile Optimizations
- **Custom cursor disabled** on mobile
- **Animations simplified** for reduced power consumption
- **Touch states** instead of hover states
- **Magnetic button hidden** on mobile (md: breakpoint)

### Breakpoint Handling
- **Hero layout**: 1 col (mobile) → 2 col (md+)
- **Features grid** : 1 col → 3 col (md+)
- **Testimonials** : 1 col → 3 col (md+)
- **All animations** scale and adapt

---

## 13. COLOR & DESIGN TOKENS

### Animation Colors
- **Primary**: Gold (#c9a24b)
- **Secondary**: Amber (#e3c374)
- **Dark**: Void (#0a0908)
- **Light**: Off-white (#f5f1e8)

### Shadow Tokens
- **Soft**: rgba(0, 0, 0, 0.08)
- **Medium**: rgba(0, 0, 0, 0.12)
- **Gold glow**: rgba(201, 162, 75, 0.3)

---

## 14. COMPONENT HIERARCHY

```
NewHomepage
├── CustomCursor (dynamic import, ssr: false)
├── ScrollProgress
└── main
    ├── HeroSplit
    ├── Marquee
    ├── FeatureSpotlight
    ├── PortfolioShowcase
    ├── TestimonialsWall
    └── FooterPremium
        └── FooterLink (animated)
            └── AnimatedLink (variant: ghost)
```

---

## 15. TESTING CHECKLIST

- [ ] Test on Chrome, Firefox, Safari
- [ ] Verify `prefers-reduced-motion` works
- [ ] Test on mobile (animations disabled correctly)
- [ ] Check keyboard navigation
- [ ] Verify focus states visible
- [ ] Test scroll performance (Lighthouse)
- [ ] Verify custom cursor on desktop
- [ ] Check button interactions (hover, click, disabled)
- [ ] Test footer form (email focus, submit)
- [ ] Verify all animations smooth (60fps target)

---

## 16. TECH STACK

- **Animation Library**: Framer Motion v12.43.0
- **Styling**: Tailwind CSS v4
- **Framework**: Next.js 16
- **React**: v19
- **Utilities**: clsx, tailwind-merge

---

## 17. FILES MODIFIED

- `src/lib/motion.ts` - Expanded motion presets library
- `nocturne-tattoo/components/redesign/HeroSplit.tsx` - Staggered reveals, parallax
- `nocturne-tattoo/components/redesign/Nav.tsx` - Animated nav, scroll effects
- `nocturne-tattoo/components/redesign/PortfolioShowcase.tsx` - Card animations
- `nocturne-tattoo/components/redesign/FeatureSpotlight.tsx` - Feature cards
- `nocturne-tattoo/components/redesign/TestimonialsWall.tsx` - Testimonial animations
- `nocturne-tattoo/components/redesign/MagneticButton.tsx` - Enhanced magnetic effect
- `nocturne-tattoo/components/redesign/Marquee.tsx` - Fade edges
- `nocturne-tattoo/components/redesign/FooterPremium.tsx` - Form animations
- `nocturne-tattoo/components/redesign/redesign.module.css` - Performance optimizations
- `nocturne-tattoo/tailwind.config.ts` - New animation keyframes
- `nocturne-tattoo/components/redesign/NewHomepage.tsx` - Integration

## 18. FILES CREATED

- `nocturne-tattoo/components/redesign/ScrollProgress.tsx` - Scroll indicator
- `nocturne-tattoo/components/redesign/CustomCursor.tsx` - Premium cursor
- `nocturne-tattoo/components/redesign/AnimatedLink.tsx` - Reusable animated link

---

## Notes

All animations are:
- ✅ Purposeful and enhance UX
- ✅ Performance-optimized (GPU-accelerated)
- ✅ Accessible (respects `prefers-reduced-motion`)
- ✅ Responsive (mobile-friendly)
- ✅ Consistent (unified motion system)
- ✅ Premium (Apple/Linear/Framer quality)
