"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
