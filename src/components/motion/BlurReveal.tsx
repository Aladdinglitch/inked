"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { blurReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function BlurReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={blurReveal.initial}
      whileInView={blurReveal.whileInView}
      viewport={blurReveal.viewport}
      transition={{ ...blurReveal.transition, delay }}
    >
      {children}
    </motion.div>
  );
}
