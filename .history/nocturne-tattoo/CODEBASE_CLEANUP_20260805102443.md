# Inked Attraction — Codebase Cleanup Guide

**Date**: August 2024  
**Purpose**: Identify and document unused files, folders, and optimization opportunities  
**Status**: Audit Updated - Follow-up Required

---

## Overview

This document identifies unused and redundant code in the Inked Attraction codebase. The project has two parallel implementations (src/ and nocturne-tattoo/) that create duplication. Current focus is on the active redesign route (nocturne-tattoo/), but significant cleanup is possible.

## Audit Update (August 2026)

A follow-up audit found that some files previously marked safe to delete are still imported:

- `components/navbar.tsx` and `components/footer.tsx` are used by shared route chrome for non-homepage routes
- `components/hero.tsx` and `components/testimonial-card.tsx` are still imported by `app/legacy-homepage.tsx`
- `lib/design-tokens.ts` remains a better near-term deletion candidate than the legacy UI files above

Treat the original Phase 1 delete list as outdated until those imports are removed.

---

## 🔴 Duplicate Project Structure

### Problem
The codebase contains **TWO complete implementations** of the same project:
- `src/` — Original implementation
- `nocturne-tattoo/` — Active implementation (in use)

### Impact
- **Redundant maintenance**: Changes must be made in both places
- **Storage waste**: ~50% code duplication
- **Configuration confusion**: Multiple tsconfig, next.config files
- **Build complexity**: Unnecessary files compiled

### Recommendation
**DELETE ENTIRE `src/` DIRECTORY** — It is completely unused and superseded by `nocturne-tattoo/`

---

## 📁 Files Recommended for Deletion

### Tier 1: SAFE TO DELETE (Not Used)

#### In `src/` (Complete Directory)
**Status**: Entirely redundant, superseded by `nocturne-tattoo/`

```
src/
├── app/
│   ├── layout.tsx              ❌ DUPLICATE (nocturne-tattoo/app/layout.tsx)
│   ├── page.tsx                ❌ DUPLICATE (nocturne-tattoo/app/page.tsx)
│   ├── not-found.tsx           ❌ DUPLICATE
│   ├── favicon.ico             ❌ UNUSED
│   ├── globals.css             ❌ DUPLICATE
│   ├── about/page.tsx          ❌ UNUSED
│   ├── artists/page.tsx        ❌ UNUSED
│   ├── blog/page.tsx           ❌ UNUSED
│   ├── booking/page.tsx        ❌ UNUSED
│   ├── contact/page.tsx        ❌ UNUSED
│   ├── faq/page.tsx            ❌ UNUSED
│   ├── portfolio/page.tsx      ❌ UNUSED
│   ├── pricing/page.tsx        ❌ UNUSED
│   ├── styles/page.tsx         ❌ UNUSED
│   ├── artists/[slug]/page.tsx ❌ UNUSED
│   └── blog/[slug]/page.tsx    ❌ UNUSED
│
├── components/
│   ├── artists/ArtistCard.tsx      ❌ UNUSED
│   ├── booking/BookingForm.tsx     ❌ UNUSED
│   ├── booking/BookingFormWrapper.tsx ❌ UNUSED
│   ├── brand/HeroWatermark.tsx     ❌ UNUSED
│   ├── brand/LoadingScreen.tsx     ❌ UNUSED
│   ├── brand/Logo.tsx              ❌ UNUSED
│   ├── contact/ContactForm.tsx     ❌ UNUSED
│   ├── faq/FaqAccordion.tsx        ❌ UNUSED
│   ├── gallery/GalleryGrid.tsx     ❌ UNUSED
│   ├── gallery/GalleryLightbox.tsx ❌ UNUSED
│   ├── home/FeaturedArtists.tsx    ❌ UNUSED
│   ├── home/Hero.tsx               ❌ UNUSED
│   ├── home/InstagramFeed.tsx      ❌ UNUSED
│   ├── home/RecentPortfolio.tsx    ❌ UNUSED
│   ├── home/Stats.tsx              ❌ UNUSED
│   ├── home/StylesPreview.tsx      ❌ UNUSED
│   ├── home/Testimonials.tsx       ❌ UNUSED
│   ├── layout/Footer.tsx           ❌ UNUSED
│   ├── layout/Navbar.tsx           ❌ UNUSED
│   ├── motion/AnimatedCard.tsx     ❌ UNUSED
│   ├── motion/BlurReveal.tsx       ❌ UNUSED
│   ├── motion/FadeUp.tsx           ❌ UNUSED
│   ├── motion/InteractiveButton.tsx ❌ UNUSED
│   ├── redesign/* (DUPLICATES)
│   │   ├── FeatureSpotlight.tsx    ❌ DUPLICATE
│   │   ├── FooterPremium.tsx       ❌ DUPLICATE
│   │   ├── HeroSplit.tsx           ❌ DUPLICATE
│   │   ├── MagneticButton.tsx      ❌ DUPLICATE
│   │   ├── Marquee.tsx             ❌ DUPLICATE
│   │   ├── NewHomepage.tsx         ❌ DUPLICATE
│   │   ├── PortfolioShowcase.tsx   ❌ DUPLICATE
│   │   ├── TestimonialsWall.tsx    ❌ DUPLICATE
│   │   └── redesign.module.css     ❌ DUPLICATE
│   └── ui/* (DUPLICATES)
│       ├── accordion.tsx          ❌ DUPLICATE
│       ├── button.tsx             ❌ DUPLICATE
│       ├── cta-banner.tsx         ❌ UNUSED
│       ├── CustomCursor.tsx       ❌ DUPLICATE
│       ├── dialog.tsx             ❌ DUPLICATE
│       ├── input.tsx              ❌ DUPLICATE
│       ├── label.tsx              ❌ DUPLICATE
│       ├── ScrollProgress.tsx     ❌ DUPLICATE
│       ├── skeleton.tsx           ❌ DUPLICATE
│       ├── social-links.tsx       ❌ DUPLICATE
│       └── textarea.tsx           ❌ DUPLICATE
│
├── content/
│   ├── artists.ts                 ❌ DUPLICATE (nocturne-tattoo/lib/data.ts)
│   ├── blog.ts                    ❌ DUPLICATE
│   ├── faq.ts                     ❌ DUPLICATE
│   ├── portfolio.ts               ❌ DUPLICATE
│   ├── pricing.ts                 ❌ DUPLICATE
│   ├── styles.ts                  ❌ DUPLICATE
│   └── testimonials.ts            ❌ DUPLICATE
│
├── hooks/
│   ├── useFavorites.ts            ❌ UNUSED
│   └── useReducedMotion.ts        ✅ USED (but duplicate exists)
│
└── lib/
    ├── constants.ts               ❌ DUPLICATE
    ├── data.ts                    ❌ DUPLICATE
    ├── format.ts                  ❌ UNUSED
    ├── motion.ts                  ✅ PARTIALLY USED (enhanced version)
    ├── utils.ts                   ❌ DUPLICATE
    └── validators.ts              ❌ UNUSED
```

**Action**: DELETE ENTIRE `/src` DIRECTORY  
**Savings**: ~2,000+ lines of code, 150+ files

---

### Tier 2: POTENTIALLY UNUSED (nocturne-tattoo/)

#### Old Component Library
```
nocturne-tattoo/components/
├── animated-counter.tsx           ⚠️ LIKELY UNUSED
├── artist-card.tsx                ⚠️ LIKELY UNUSED
├── booking-form.tsx               ⚠️ LIKELY UNUSED
├── contact-form.tsx               ⚠️ LIKELY UNUSED
├── cta-banner.tsx                 ⚠️ LIKELY UNUSED
├── fade-up.tsx                    ⚠️ POSSIBLY UNUSED (might be in use)
├── faq-accordion.tsx              ⚠️ LIKELY UNUSED
├── footer.tsx                     ⚠️ USED by shared route chrome
├── gallery-grid.tsx               ⚠️ LIKELY UNUSED
├── hero.tsx                       ⚠️ USED by app/legacy-homepage.tsx
├── ink-art.tsx                    ⚠️ LIKELY UNUSED
├── instagram-feed.tsx             ⚠️ LIKELY UNUSED
├── lightbox.tsx                   ⚠️ LIKELY UNUSED
├── navbar.tsx                     ⚠️ USED by shared route chrome
├── needle-line.tsx                ⚠️ LIKELY UNUSED
├── pricing-cards.tsx              ⚠️ LIKELY UNUSED
├── section-heading.tsx            ⚠️ LIKELY UNUSED
├── social-links.tsx               ⚠️ LIKELY UNUSED
└── testimonial-card.tsx           ⚠️ USED by app/legacy-homepage.tsx
```

**Action**: Audit and delete confirmed unused components  
**Estimated Savings**: ~600 lines

---

### Tier 3: OLD LIBRARY FILES (nocturne-tattoo/lib)

```
nocturne-tattoo/lib/
├── design-tokens.ts               ⚠️ REPLACED (moved to tailwind.config.ts)
└── redesign.ts                    ⚠️ POSSIBLY UNUSED
```

---

## 🎯 Cleanup Priority Matrix

| File | Type | Status | Action | Priority | Savings |
|------|------|--------|--------|----------|---------|
| `/src` (entire) | Directory | Unused | DELETE | 🔴 HIGH | ~2KB |
| `header.tsx` | Component | Unused | DELETE | 🔴 HIGH | ~150B |
| `navbar.tsx` | Component | Still used | KEEP FOR NOW | 🔴 HIGH | ~180B |
| `footer.tsx` | Component | Still used | KEEP FOR NOW | 🔴 HIGH | ~200B |
| `hero.tsx` | Component | Still used | KEEP FOR NOW | 🔴 HIGH | ~220B |
| `animated-counter.tsx` | Component | Unused | DELETE | 🟠 MEDIUM | ~120B |
| `design-tokens.ts` | Config | Superseded | DELETE | 🟠 MEDIUM | ~100B |
| `fade-up.tsx` | Component | Uncertain | AUDIT | 🟡 LOW | ~80B |
| `ink-art.tsx` | Component | Uncertain | AUDIT | 🟡 LOW | ~90B |

---

## 🔍 Detailed Unused Component Analysis

### Confirmed Unused / Revalidated Usage

#### 1. `nocturne-tattoo/components/hero.tsx`
- **Status**: Still used
- **Reason**: Imported by `app/legacy-homepage.tsx`
- **Impact**: Deleting breaks the preserved legacy homepage file
- **Action**: KEEP until legacy homepage is removed or refactored

#### 2. `nocturne-tattoo/components/navbar.tsx`
- **Status**: Still used
- **Reason**: Imported by shared route chrome for non-homepage pages
- **Impact**: Deleting breaks interior-page layout
- **Action**: KEEP until all routes migrate off legacy chrome

#### 3. `nocturne-tattoo/components/footer.tsx`
- **Status**: Still used
- **Reason**: Imported by shared route chrome for non-homepage pages
- **Impact**: Deleting breaks interior-page layout
- **Action**: KEEP until all routes migrate off legacy chrome

#### 4. `nocturne-tattoo/components/testimonial-card.tsx`
- **Status**: Still used
- **Reason**: Imported by `app/legacy-homepage.tsx`
- **Impact**: Deleting breaks the preserved legacy homepage file
- **Action**: KEEP until legacy homepage is removed or refactored

#### 5. `nocturne-tattoo/lib/design-tokens.ts`
- **Status**: Functionality moved to `tailwind.config.ts`
- **Reason**: Design tokens now managed via Tailwind
- **Impact**: None (not imported anywhere)
- **Action**: DELETE

#### 6. `nocturne-tattoo/lib/redesign.ts`
- **Status**: Appears unused
- **Reason**: All redesign logic in components
- **Impact**: Unknown (needs audit)
- **Action**: AUDIT

### Potentially Unused (Requires Verification)

#### 1. `nocturne-tattoo/components/animated-counter.tsx`
- **Status**: Likely unused (not in current homepage)
- **Usage**: May be used on other pages (pricing, stats)
- **Action**: SEARCH codebase for imports before deleting

#### 2. `nocturne-tattoo/components/booking-form.tsx`
- **Status**: May be used on booking page
- **Usage**: Likely used on `/booking` route
- **Action**: VERIFY before deleting

#### 3. `nocturne-tattoo/components/faq-accordion.tsx`
- **Status**: May be used on FAQ page
- **Usage**: Likely used on `/faq` route
- **Action**: VERIFY before deleting

#### 4. `nocturne-tattoo/components/gallery-grid.tsx`
- **Status**: May be used on gallery page
- **Usage**: Likely used on `/gallery` route
- **Action**: VERIFY before deleting

#### 5. `nocturne-tattoo/components/artist-card.tsx`
- **Status**: May be used on artists page
- **Usage**: Likely used on `/artists` route
- **Action**: VERIFY before deleting

---

## 📋 Recommended Cleanup Steps

### Phase 1: Immediate (Safe) Deletions

```bash
# Delete entire duplicate src directory
rm -rf src/

# Delete old library files after verifying no imports
rm nocturne-tattoo/lib/design-tokens.ts
```

**Estimated Savings**: Partial until legacy route imports are removed
**Risk Level**: MEDIUM (legacy and shared chrome files are still in use)

---

### Phase 2: Verification Required

Before deleting these, search for imports:

```bash
# Search for component imports
grep -r "animated-counter" nocturne-tattoo/
grep -r "booking-form" nocturne-tattoo/
grep -r "faq-accordion" nocturne-tattoo/
grep -r "gallery-grid" nocturne-tattoo/
grep -r "artist-card" nocturne-tattoo/
grep -r "contact-form" nocturne-tattoo/
grep -r "fade-up" nocturne-tattoo/
grep -r "redesign.ts" nocturne-tattoo/
```

**Action**: If no imports found, delete these files  
**Estimated Savings**: ~800B  
**Risk Level**: MEDIUM (depends on page usage)

---

### Phase 3: Legacy Component Review

These may be placeholders or utilities:

```bash
# Components to review
- nocturne-tattoo/components/ink-art.tsx
- nocturne-tattoo/components/instagram-feed.tsx
- nocturne-tattoo/components/lightbox.tsx
- nocturne-tattoo/components/needle-line.tsx
- nocturne-tattoo/components/pricing-cards.tsx
- nocturne-tattoo/components/section-heading.tsx
- nocturne-tattoo/components/social-links.tsx
- nocturne-tattoo/components/cta-banner.tsx
```

**Action**: Review each for actual usage  
**Estimated Savings**: ~1.2KB  
**Risk Level**: HIGH (unclear usage patterns)

---

## 🧹 File Organization Improvements

### Current Issues

1. **Duplicate Components**: Redesign components exist in two places
   - `nocturne-tattoo/components/redesign/*`
   - `src/components/redesign/*`

2. **Scattered Data Files**: Content spread across multiple locations
   - `nocturne-tattoo/lib/data.ts`
   - `src/lib/data.ts`
   - `src/content/*`

3. **Multiple Config Files**: Root level config duplication
   - `next.config.ts`
   - `nocturne-tattoo/next.config.js`
   - `nocturne-tattoo/postcss.config.js`

4. **Redundant Utilities**: Utility functions duplicated
   - `nocturne-tattoo/lib/utils.ts`
   - `src/lib/utils.ts`

### Recommended Structure

```
nocturne-tattoo/  (Keep as primary)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── robots.ts
│   ├── sitemap.ts
│   └── routes/
│       ├── about/
│       ├── artists/
│       ├── blog/
│       ├── booking/
│       ├── contact/
│       ├── faq/
│       ├── gallery/
│       ├── pricing/
│       └── styles/
├── components/
│   ├── redesign/  (Keep, all active)
│   ├── ui/        (Keep, all active)
│   └── [DELETE old components]
├── lib/
│   ├── data.ts    (Consolidated)
│   ├── utils.ts
│   ├── motion.ts
│   └── validators.ts
├── public/
│   └── images/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json

[DELETE ENTIRE /src DIRECTORY]
```

---

## 📊 Summary Statistics

### Current State
- **Total Files**: ~200+
- **Components**: ~70+
- **Code Duplication**: ~50%
- **Unused/Redundant**: ~30 files
- **Lines of Dead Code**: ~3,000+

### After Cleanup (Phase 1)
- **Total Files**: ~140
- **Components**: ~40
- **Code Duplication**: ~0%
- **Unused/Redundant**: ~5 files (Phase 2/3)
- **Savings**: ~40% reduction

### After Full Cleanup (All Phases)
- **Total Files**: ~110
- **Components**: ~25 (active)
- **Code Duplication**: 0%
- **Unused/Redundant**: 0
- **Savings**: ~55% reduction

---

## 🚀 Implementation Checklist

### Pre-Cleanup
- [ ] Commit current changes to git
- [ ] Create backup branch
- [ ] Document any questions about component usage

### Phase 1 Cleanup
- [ ] Delete `/src` directory entirely
- [ ] Decide whether to preserve or remove `app/legacy-homepage.tsx`
- [ ] Migrate or retire legacy chrome used by non-homepage routes
- [ ] Re-audit `nocturne-tattoo/components/hero.tsx`
- [ ] Re-audit `nocturne-tattoo/components/navbar.tsx`
- [ ] Re-audit `nocturne-tattoo/components/footer.tsx`
- [ ] Re-audit `nocturne-tattoo/components/testimonial-card.tsx`
- [ ] Delete `nocturne-tattoo/lib/design-tokens.ts` if no imports are found
- [ ] Verify build succeeds
- [ ] Test homepage functionality

### Phase 2 Cleanup
- [ ] Search for unused component imports
- [ ] Delete verified unused components
- [ ] Review `redesign.ts` for usage
- [ ] Delete unused utilities
- [ ] Verify build succeeds

### Phase 3 Cleanup
- [ ] Review legacy components
- [ ] Delete confirmed unused files
- [ ] Consolidate duplicate data files
- [ ] Finalize file structure
- [ ] Run full test suite

### Post-Cleanup
- [ ] Run Lighthouse audit
- [ ] Verify no broken imports
- [ ] Test all routes
- [ ] Performance benchmark
- [ ] Commit changes

---

## 🔗 Related Documentation

- See `UPDATE_LOG.md` for all visual design changes
- See `ANIMATION_ENHANCEMENTS.md` for animation system details

---

## Notes

**Caution**: Before deleting any files, especially in Phase 2 and 3, verify:
1. No imports exist elsewhere in codebase
2. Not needed for other pages/routes
3. No conditional imports or dynamic requires
4. Tests pass after deletion

**Recommendation**: Use automated tools like ESLint with unused variable rules to assist in identification.

---

**End of Cleanup Guide**
