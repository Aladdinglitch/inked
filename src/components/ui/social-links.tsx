"use client";

import Link from "next/link";
import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="rounded-full border border-border p-2 text-muted-foreground"
      whileHover={{
        scale: 1.1,
        borderColor: "hsl(var(--primary))",
        color: "hsl(var(--primary))",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {children}
      </motion.div>
    </motion.a>
  );
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <IconLink href={SITE.socials.instagram} label="Instagram">
        <svg
          viewBox="0 0 24 24"
          className="size-4 fill-none stroke-current"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </IconLink>
      <IconLink href={SITE.socials.facebook} label="Facebook">
        <svg
          viewBox="0 0 24 24"
          className="size-4 fill-none stroke-current"
          aria-hidden="true"
        >
          <path
            d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z"
            strokeWidth="1.8"
          />
        </svg>
      </IconLink>
      <IconLink href={SITE.socials.tiktok} label="TikTok">
        <Share2 className="size-4" />
      </IconLink>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href="/contact"
          className="text-xs tracking-widest text-muted-foreground uppercase hover:text-primary transition-colors"
        >
          Contact
        </Link>
      </motion.div>
    </div>
  );
}
