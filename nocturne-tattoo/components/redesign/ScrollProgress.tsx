"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduce = useReducedMotion();

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold to-gold origin-left z-50"
        style={shouldReduce ? { scaleX: 0 } : { scaleX: scrollYProgress }}
        transition={{ duration: 0.1 }}
      />

      {/* Scroll indicator dot */}
      <motion.div
        className="fixed bottom-8 right-8 w-2.5 h-2.5 rounded-full bg-gold shadow-md z-40"
        animate={shouldReduce ? {} : {
          y: [0, -8, 0],
        }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]),
        }}
      />
    </>
  );
}
