"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { PortfolioItem } from "@/content/portfolio";

type GalleryLightboxProps = {
  item: PortfolioItem | null;
  onClose: () => void;
};

export function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-hidden p-0">
        {item ? (
          <>
            <DialogTitle className="sr-only">{item.title}</DialogTitle>
            <div className="relative aspect-[4/5] w-full md:aspect-video">
              <Image src={item.image} alt={item.title} fill className="object-contain" />
            </div>
            <div className="border-t border-border p-4">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm capitalize text-muted-foreground">{item.category}</p>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
