"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function AnimatedLink({
  href,
  children,
  variant = "ghost",
  className = "",
}: AnimatedLinkProps) {
  const variants = {
    primary: "relative group rounded-full bg-black px-6 py-3 text-sm font-semibold text-white",
    secondary: "relative group rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-black",
    ghost: "relative group text-sm text-muted",
  };

  return (
    <Link href={href}>
      <motion.div
        className={`${variants[variant]} ${className}`}
        whileHover={{ scale: variant !== "ghost" ? 1.05 : 1 }}
        whileTap={{ scale: variant !== "ghost" ? 0.98 : 0.99 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-amber-400 opacity-0 -z-10"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <span className="relative inline-flex items-center gap-2">
          {children}

          {variant === "ghost" && (
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -8 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          )}
        </span>

        {variant === "ghost" && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-black origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </motion.div>
    </Link>
  );
}
