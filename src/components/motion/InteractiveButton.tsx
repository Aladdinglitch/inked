"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  ripple?: boolean;
}

export function InteractiveButton({
  children,
  className,
  variant = "default",
  ripple = true,
  onMouseDown,
  ...props
}: InteractiveButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple) {
      onMouseDown?.(e);
      return;
    }

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onMouseDown?.(e);
  };

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute pointer-events-none bg-white/20 rounded-full"
            initial={{
              width: 0,
              height: 0,
              left: r.x,
              top: r.y,
              opacity: 1,
            }}
            animate={{
              width: 400,
              height: 400,
              left: r.x - 200,
              top: r.y - 200,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {children}
    </motion.button>
  );
}
