"use client";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useTransform(x, [-20, 20], [0.98, 1.02]);

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
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
    <Link href={href} className="relative">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-gold to-amber-400 px-5 py-2 text-sm font-semibold text-white shadow-lg"
        style={{ x, y, scale }}
      >
        {children}
      </motion.div>
    </Link>
  );
}
