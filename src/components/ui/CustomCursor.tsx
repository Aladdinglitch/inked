"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;

      if (target.closest("a") || target.closest("button")) {
        setIsHovering(true);
        const text = (target.closest("a") as HTMLAnchorElement)?.href
          ? "Explore"
          : "Click";
        setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full border border-primary pointer-events-none" />
          <div className="absolute inset-1 rounded-full bg-primary/20" />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:flex items-center justify-center"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
          <span className="text-xs font-medium text-primary">{cursorText}</span>
        </div>
      </motion.div>
    </>
  );
}
