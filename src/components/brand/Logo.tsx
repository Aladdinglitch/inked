"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  animated?: boolean;
  variant?: "default" | "navbar" | "footer";
  className?: string;
}

const sizeClasses = {
  default: "h-12 w-12 sm:h-16 sm:w-16 md:h-[4.375rem] md:w-[4.375rem]",
  navbar: "h-12 w-12 sm:h-16 sm:w-16 md:h-[4.375rem] md:w-[4.375rem]",
  footer: "h-14 w-14 sm:h-16 sm:w-16",
};

export function Logo({ href = "/", animated = false, variant = "default", className }: LogoProps) {
  const logoContent = (
    <motion.div
      className={cn("inline-block", className)}
      whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
      initial={animated ? { opacity: 0, scale: 0.95 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={
        animated
          ? {
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
            }
          : undefined
      }
    >
      <div className={cn("relative overflow-hidden", sizeClasses[variant])}>
        <Image
          src="/images/logo.png"
          alt="Inked Attraction Tattoo & Piercing"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 70px"
        />
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Inked Attraction home">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
