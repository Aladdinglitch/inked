"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Nav from "@/components/redesign/Nav";
import FooterPremium from "@/components/redesign/FooterPremium";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) {
    return (
      <>
        <Nav />
        <main id="main">{children}</main>
        <FooterPremium />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
