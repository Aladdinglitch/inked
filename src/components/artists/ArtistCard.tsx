"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Artist } from "@/content/artists";

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/artists/${artist.slug}`}>
        <motion.div
          className="group block overflow-hidden border border-border bg-card transition-colors duration-500 hover:border-primary/50"
          whileHover={{
            y: -8,
            boxShadow: "0 24px 48px rgba(212, 175, 55, 0.15)",
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-black/50">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.div
            className="p-5"
            initial={{ opacity: 0.95 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.h3
              className="display text-2xl text-foreground"
              whileHover={{ color: "hsl(var(--primary))" }}
              transition={{ duration: 0.2 }}
            >
              {artist.name}
            </motion.h3>

            <motion.p
              className="mt-1 text-sm text-primary"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {artist.role}
            </motion.p>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {artist.bio}
            </p>

            <motion.div
              className="mt-3 h-0.5 w-8 bg-primary"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
