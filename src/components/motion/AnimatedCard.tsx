"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverable?: boolean;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hoverable = true,
}: AnimatedCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverable) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const rotateX = isHovering ? (mousePosition.y - 0.5) * 5 : 0;
  const rotateY = isHovering ? (mousePosition.x - 0.5) * -5 : 0;

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{
          y: isHovering ? -8 : 0,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => hoverable && setIsHovering(true)}
        onMouseLeave={() => {
          if (hoverable) setIsHovering(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          perspective: "1000px",
        }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{
            rotateX,
            rotateY,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="h-full w-full rounded-lg transition-all duration-300"
            animate={{
              boxShadow: isHovering
                ? "0 20px 40px rgba(212, 175, 55, 0.15)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
