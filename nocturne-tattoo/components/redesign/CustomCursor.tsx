"use client";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const shouldReduce = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const cursorSize = useMotionValue(12);
  const cursorOpacity = useTransform(cursorSize, [12, 30], [1, 0.5]);

  useEffect(() => {
    if (shouldReduce) {
      document.body.style.cursor = "auto";
      return;
    }

    // Hide default cursor
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const handleMouseEnter = (e: any) => {
      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList?.contains("interactive") ||
        target.closest("a") ||
        target.closest("button");

      if (isInteractive) {
        cursorSize.set(30);
      } else {
        cursorSize.set(12);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.style.cursor = "auto";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, cursorSize, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] mix-blend-multiply"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gold rounded-full"
        style={{
          width: cursorSize,
          height: cursorSize,
          opacity: cursorOpacity,
        }}
      />

      {/* Inner dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gold rounded-full" />
    </motion.div>
  );
}
