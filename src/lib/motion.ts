const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  spring: [0.22, 1, 0.36, 1] as [number, number, number, number],
  expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  back: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
};

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: easing.spring },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, amount: 0.15 },
};

export const blurReveal = {
  initial: { opacity: 0, filter: "blur(10px)", y: 20 },
  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: easing.spring },
};

export const scaleReveal = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easing.spring },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easing.spring },
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easing.spring },
};

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.25, ease: easing.spring },
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

export const cardHover = {
  y: -8,
  transition: { duration: 0.3, ease: easing.smooth },
};

export const cardShadow = {
  initial: { boxShadow: "0 0 0 rgba(212, 175, 55, 0)" },
  whileHover: {
    boxShadow: "0 20px 40px rgba(212, 175, 55, 0.15)",
  },
};

export const shimmer = {
  initial: { backgroundPosition: "200% center" },
  animate: { backgroundPosition: "-200% center" },
  transition: { duration: 3, ease: "linear", repeat: Infinity },
};

export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, ease: "easeInOut", repeat: Infinity },
  },
};

export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(212, 175, 55, 0.4)",
      "0 0 0 10px rgba(212, 175, 55, 0)",
    ],
  },
  transition: { duration: 2, ease: "easeOut", repeat: Infinity },
};

export const staggerChildren = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing.spring } },
  },
};

export const textReveal = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing.spring },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: easing.smooth },
};

// Premium micro-interaction animations
export const underlineReveal = {
  initial: { scaleX: 0 },
  whileHover: { scaleX: 1 },
  transition: { duration: 0.3, ease: easing.spring },
};

export const softLift = {
  whileHover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
  },
  transition: { duration: 0.3, ease: easing.smooth },
};

export const imageZoom = {
  whileHover: { scale: 1.08 },
  transition: { duration: 0.4, ease: easing.smooth },
};

export const magneticAttraction = (offsetX: number, offsetY: number) => ({
  x: offsetX,
  y: offsetY,
  transition: { type: "spring", stiffness: 150, damping: 15 },
});

export const rippleEffect = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { scale: 4, opacity: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const heroStagger = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
  item: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easing.spring },
  },
};

export const parallaxScroll = (range: [number, number], output: [number, number]) => ({
  y: output,
});

export const scrollReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: easing.spring },
};

export const sectionFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: easing.smooth },
};

export const glassHover = {
  whileHover: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
  },
  transition: { duration: 0.3 },
};

export const buttonGlow = {
  initial: { boxShadow: "0 0 0 rgba(201, 162, 75, 0)" },
  whileHover: {
    boxShadow: "0 0 20px rgba(201, 162, 75, 0.3)",
  },
  transition: { duration: 0.3 },
};

export const characterReveal = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easing.spring, delay },
});

export const floatingBubble = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 360, 360],
  },
  transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
};

export const gradientBorder = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%"],
  },
  transition: { duration: 3, ease: "linear", repeat: Infinity },
};

export const scanLineReveal = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  animate: { clipPath: "inset(0% 0 0 0)" },
  transition: { duration: 0.8, ease: easing.spring },
};

export const rotateIcon = {
  whileHover: { rotate: 360 },
  transition: { duration: 0.5, ease: easing.spring },
};

export const errorShake = {
  animate: {
    x: [-4, 4, -4, 4, 0],
  },
  transition: { duration: 0.4 },
};

export const successPulse = {
  animate: {
    scale: [1, 1.1, 1],
  },
  transition: { duration: 0.5, ease: easing.spring },
};
