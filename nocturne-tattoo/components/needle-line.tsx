"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * The site's signature motif: one continuous line drawing itself across
 * the section, standing in for a single unbroken tattoo pass. Used between
 * major sections instead of a plain <hr>.
 */
export function NeedleLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 24" className="h-6 w-full" preserveAspectRatio="none">
        <motion.path
          d="M0 12 C 150 2, 300 22, 450 12 S 750 2, 900 12 S 1100 20, 1200 12"
          fill="none"
          stroke="url(#needleGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="needleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c9a24b" stopOpacity="0" />
            <stop offset="50%" stopColor="#c9a24b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c9a24b" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
