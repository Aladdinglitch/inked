/**
 * lib/motion.ts
 * Centralized Framer Motion variants and easing functions for Inked Attraction.
 * Import from here instead of duplicating per-component.
 */

// ─── Easing Functions ────────────────────────────────────────────────────────

export const ease = {
  /** Smooth cubic — default for most transitions */
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  /** Spring-like overshoot for entrances */
  spring: [0.22, 1, 0.36, 1] as const,
  /** Expo ease-out — for fast reveals */
  expo: [0.16, 1, 0.3, 1] as const,
  /** Back ease — gentle bounce */
  back: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

// ─── Shared Variants ─────────────────────────────────────────────────────────

/** Fade + lift from below — for text, cards, and section reveals */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.spring },
  },
};

/** Custom-delay version — pass `custom={index}` to get staggered delays */
export const fadeUpCustom = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.12,
      duration: 0.6,
      ease: ease.spring,
    },
  }),
};

/** Stagger container — wraps animated children */
export const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

/** Slower stagger for feature/testimonial grids */
export const staggerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/** Scale reveal — cards entering from slightly small */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.spring },
  },
};

/** Slide in from left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: ease.spring },
  },
};

/** Slide in from right */
export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: ease.spring },
  },
};

// ─── Hover Variants ───────────────────────────────────────────────────────────

/** Standard card hover — lift + shadow */
export const cardHover = {
  rest: { y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.04)" },
  hover: {
    y: -8,
    boxShadow: "0 40px 80px rgba(0,0,0,0.10)",
    transition: { duration: 0.4, ease: ease.spring },
  },
};

/** Image zoom on hover */
export const imageZoom = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: 0.4, ease: ease.spring },
  },
};

/** Underline reveal — set originX:0 on the element */
export const underlineReveal = {
  rest: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: ease.spring },
  },
};

// ─── Continuous Animations ────────────────────────────────────────────────────

/** Ambient floating orb — use with `animate` prop */
export const floatSlow = {
  animate: { y: [0, -20, 0], x: [0, 10, 0] },
  transition: { duration: 6, ease: "easeInOut", repeat: Infinity } as const,
};

export const floatMedium = {
  animate: { y: [0, -14, 0], x: [0, -8, 0] },
  transition: { duration: 5, ease: "easeInOut", repeat: Infinity } as const,
};

/** Subtle breathe / pulse */
export const breathe = {
  animate: { scale: [1, 1.08, 1] },
  transition: { duration: 4, ease: "easeInOut", repeat: Infinity } as const,
};

// ─── Viewport Defaults ────────────────────────────────────────────────────────

/** Standard whileInView viewport options */
export const viewport = {
  once: true,
  amount: 0.2,
} as const;

export const viewportEager = {
  once: true,
  amount: 0.3,
} as const;
