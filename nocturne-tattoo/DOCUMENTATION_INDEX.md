# Inked Attraction — Documentation Index

**Last Updated**: August 2026
**Version**: 2.1 (Redesign Follow-up)

---

## 📚 Documentation Guide

All project documentation is organized below. Start with the relevant document for your needs.

## Current Status

- The redesign homepage is active at `app/page.tsx`
- Homepage chrome now routes through `components/site-chrome.tsx`, which applies redesigned navigation and footer only on `/`
- Legacy components still support interior pages and the preserved `app/legacy-homepage.tsx`
- Cleanup guidance in `CODEBASE_CLEANUP.md` should be treated as audit-driven, not as a blanket delete list

---

## 🎨 Design & Visual Updates

### [`UPDATE_LOG.md`](./UPDATE_LOG.md)
**Comprehensive update documentation** covering all visual design and layout changes.

**Contains**:
- ✅ Color system transformation (old vs. new)
- ✅ Typography hierarchy updates
- ✅ Layout redesigns for all major sections
- ✅ Component-by-component changes
- ✅ Spacing and proportions adjustments
- ✅ Border and radius system updates
- ✅ Shadow and depth system
- ✅ Animation timing details
- ✅ Configuration changes (Tailwind, CSS)
- ✅ Testing checklist
- ✅ Deployment notes

**📖 Read this if**:
- You need to understand what changed in the redesign
- You're reviewing design decisions
- You're implementing related features
- You're troubleshooting visual inconsistencies

**Time to read**: ~20-30 minutes  
**Audience**: Designers, Frontend Engineers, Product Managers

---

## ✨ Animation System

### [`ANIMATION_ENHANCEMENTS.md`](./ANIMATION_ENHANCEMENTS.md)
**Complete animation and interaction documentation** from Phase 1.

**Contains**:
- ✅ Micro-interactions (buttons, links, cards)
- ✅ Macro-interactions (hero, sections, scrolling)
- ✅ Scroll interactions and parallax
- ✅ Typography animations
- ✅ Image animations
- ✅ Icon animations
- ✅ Background effects
- ✅ Custom cursor implementation
- ✅ Scroll progress indicator
- ✅ Form interactions
- ✅ Accessibility features
- ✅ Performance optimization details

**📖 Read this if**:
- You need to understand the animation system
- You're adding new animations
- You're debugging interaction issues
- You're optimizing for performance

**Time to read**: ~25-35 minutes  
**Audience**: Frontend Engineers, Motion Designers

---

## 🧹 Codebase Cleanup

### [`CODEBASE_CLEANUP.md`](./CODEBASE_CLEANUP.md)
**Analysis of unused files and optimization opportunities**.

**Contains**:
- ✅ Duplicate file structure analysis
- ✅ Tier 1-3 cleanup recommendations
- ✅ File-by-file analysis
- ✅ Cleanup priority matrix
- ✅ Implementation checklist
- ✅ Estimated savings and risk levels
- ✅ Recommended folder structure

**Cleanup Opportunities**:
- 🔴 **Phase 1**: Delete `/src` directory (~2KB savings)
- 🟠 **Phase 2**: Verify and delete unused components (~800B savings)
- 🟡 **Phase 3**: Review legacy components (~1.2KB savings)

**Total Potential Savings**: ~55% code reduction

**📖 Read this if**:
- You're tasked with code cleanup
- You want to understand what files can be deleted
- You need to optimize project size
- You're refactoring the project structure

**Time to read**: ~15-20 minutes  
**Audience**: Senior Engineers, Tech Leads, DevOps

---

## 🏗️ Project Architecture

### Project Structure
```
nocturne-tattoo/              ← Main project directory
├── app/                      ← Next.js app router
│   ├── page.tsx             (Homepage - uses NewHomepage)
│   ├── layout.tsx
│   ├── globals.css
│   └── [routes]/            (All page routes)
├── components/
│   ├── redesign/            ← Active components (Phase 2)
│   │   ├── NewHomepage.tsx  (Entry point)
│   │   ├── Nav.tsx
│   │   ├── HeroSplit.tsx
│   │   ├── FeatureSpotlight.tsx
│   │   ├── PortfolioShowcase.tsx
│   │   ├── TestimonialsWall.tsx
│   │   ├── Marquee.tsx
│   │   ├── FooterPremium.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── AnimatedLink.tsx
│   │   └── redesign.module.css
│   ├── ui/                  ← UI components
│   ├── site-chrome.tsx       (Route-aware chrome switcher)
│   └── [OLD / shared]        (Legacy and interior-page components)
├── lib/
│   ├── data.ts             (Content/data)
│   ├── motion.ts           (Animation system)
│   ├── utils.ts
│   └── validators.ts
├── public/
│   └── images/             (All image assets)
├── UPDATE_LOG.md           ← This phase's changes
├── ANIMATION_ENHANCEMENTS.md ← Phase 1 details
├── CODEBASE_CLEANUP.md     ← Cleanup guide
├── AGENTS.md               ← Next.js agent rules
└── package.json

src/                        ← DEPRECATED (marked for deletion)
```

---

## 🔄 Development Workflow

### When Making Design Changes
1. Update component in `nocturne-tattoo/components/redesign/`
2. Update color tokens in `nocturne-tattoo/tailwind.config.ts`
3. If the change affects shared page chrome, verify `components/site-chrome.tsx`
4. Document changes in `UPDATE_LOG.md`
5. Test responsive design and animations
6. Run Lighthouse audit

### When Adding Animations
1. Add animation variants to `src/lib/motion.ts`
2. Import variants in component
3. Use with Framer Motion `variants` prop
4. Respect `useReducedMotion()` for accessibility
5. Document in `ANIMATION_ENHANCEMENTS.md`

### When Cleaning Up Code
1. Reference `CODEBASE_CLEANUP.md`
2. Search for all imports of file
3. Create backup branch
4. Delete verified unused files
5. Run full test suite
6. Commit with cleanup message

---

## 📋 Key Files Reference

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tailwind.config.ts` | Tailwind CSS config + design tokens |
| `tsconfig.json` | TypeScript configuration |
| `next.config.js` | Next.js configuration |
| `postcss.config.js` | PostCSS configuration |

### Core Components
| Component | Location | Status | Purpose |
|-----------|----------|--------|---------|
| NewHomepage | `components/redesign/NewHomepage.tsx` | ✅ Active | Entry point for homepage |
| Nav | `components/redesign/Nav.tsx` | ✅ Active | Navigation with animations |
| HeroSplit | `components/redesign/HeroSplit.tsx` | ✅ Active | Hero section |
| FeatureSpotlight | `components/redesign/FeatureSpotlight.tsx` | ✅ Active | Features section |
| PortfolioShowcase | `components/redesign/PortfolioShowcase.tsx` | ✅ Active | Gallery section |
| TestimonialsWall | `components/redesign/TestimonialsWall.tsx` | ✅ Active | Testimonials section |
| Marquee | `components/redesign/Marquee.tsx` | ✅ Active | Marquee text |
| FooterPremium | `components/redesign/FooterPremium.tsx` | ✅ Active | Footer |
| MagneticButton | `components/redesign/MagneticButton.tsx` | ✅ Active | CTA button |
| ScrollProgress | `components/redesign/ScrollProgress.tsx` | ✅ Active | Scroll indicator |
| CustomCursor | `components/redesign/CustomCursor.tsx` | ✅ Active | Custom cursor |

### Libraries & Utilities
| File | Purpose |
|------|---------|
| `lib/motion.ts` | Animation variants and easing functions |
| `lib/data.ts` | Content data (artists, portfolio, testimonials) |
| `lib/utils.ts` | Utility functions |
| `lib/validators.ts` | Form validation schemas |

---

## 🎯 Recent Changes Summary

### Phase 1: Animation Enhancements
- ✅ Premium micro-interactions on all elements
- ✅ Scroll-triggered macro-interactions
- ✅ Custom cursor (desktop)
- ✅ Scroll progress indicator
- ✅ Enhanced motion system

### Phase 2: Visual Design & Layout (COMPLETED)
- ✅ Modern Luxury Minimalist aesthetic
- ✅ Refined color system
- ✅ Typography hierarchy overhaul
- ✅ Spacing and proportions
- ✅ All sections redesigned
- ✅ Border and shadow system refined

### Phase 3: Next Steps (Recommended)
- 🔲 Code cleanup (delete `/src`, unused components)
- 🔲 Performance optimization
- 🔲 Accessibility audit
- 🔲 Cross-browser testing
- 🔲 Mobile optimization refinement

---

## 🧪 Testing & QA

### Pre-Launch Checklist
- [ ] Visual consistency across all pages
- [ ] All animations at 60fps (Lighthouse)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] prefers-reduced-motion respected
- [ ] All forms functional
- [ ] Images load correctly
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Mobile lighthouse score > 85

### Performance Targets
- **Lighthouse Overall**: 90+
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

---

## 🚀 Deployment

### Build & Deploy
```bash
npm run build        # Build for production
npm run start        # Start production server
npm run dev         # Development server
```

### Environment
- Next.js 14.2.35
- React 18.3.1
- Framer Motion 11.3.19
- Tailwind CSS 3.4.7
- Node 18+

---

## 📞 Need Help?

### Quick Reference
- **Animation System**: See `ANIMATION_ENHANCEMENTS.md`
- **Design Changes**: See `UPDATE_LOG.md`
- **Code Cleanup**: See `CODEBASE_CLEANUP.md`
- **Component Structure**: See files in `nocturne-tattoo/components/redesign/`
- **Motion Presets**: See `src/lib/motion.ts`

### Common Tasks

**Adding a new animation**
→ See `ANIMATION_ENHANCEMENTS.md` section on "Timing Consistency"

**Understanding a design decision**
→ See `UPDATE_LOG.md` section matching the component

**Deciding what to delete**
→ See `CODEBASE_CLEANUP.md` priority matrix

**Fixing animation performance**
→ See `ANIMATION_ENHANCEMENTS.md` section on "Performance"

---

## 📈 Project Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Code Duplication | ~50% | 0% |
| Unused Files | ~30 | 0 |
| Lines of Dead Code | ~3,000 | 0 |
| Lighthouse Score | TBD | 90+ |
| Animation FPS | 60 | 60 |
| Build Size | TBD | < 500KB |

---

## 📝 Version History

| Phase | Version | Date | Status | Key Changes |
|-------|---------|------|--------|-------------|
| 1 | 1.0 | Jul 2024 | Complete | Premium animations & interactions |
| 2 | 2.0 | Aug 2024 | Complete | Modern Luxury Minimalist redesign |
| 3 | 2.1 | Aug 2026 | In Progress | Redesign follow-up and cleanup audit |

---

## 🔗 External Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React 19 Docs](https://react.dev/)

---

## Last Updated

**Date**: August 2024  
**Updated By**: Design & Frontend Team  
**Next Review**: After Phase 3 completion

---

**Start with this document to understand the project structure, then navigate to specific docs for deep dives.**

**Questions?** Refer to the relevant documentation file above.
