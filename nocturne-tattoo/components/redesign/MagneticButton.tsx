"use client";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduce = useReducedMotion();

  const scale = useTransform(x, [-20, 20], [0.98, 1.02]);

  function handleMove(e: React.MouseEvent) {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / 6;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / 6;
    x.set(dx);
    y.set(dy);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={href} className="relative group">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative hidden md:inline-flex items-center rounded-lg bg-ink px-6 py-3 text-sm font-medium text-white shadow-md overflow-hidden"
        style={shouldReduce ? {} : { x, y, scale }}
        whileHover={shouldReduce ? undefined : { boxShadow: "0 20px 40px rgba(26, 24, 21, 0.2)" }}
        whileTap={shouldReduce ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative flex items-center gap-2">
          {children}
          <motion.span
            animate={shouldReduce ? undefined : { x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </span>
      </motion.div>
    </Link>
  );
}
