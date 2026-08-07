import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inkedattraction.example"),
  title: {
    default: "Inked Attraction — Lagos Tattoo & Piercing Studio",
    template: "%s | Inked Attraction",
  },
  description:
    "Inked Attraction is a Lagos tattoo and piercing studio delivering custom work, precision piercing, and premium aftercare guidance.",
  keywords: ["tattoo studio", "piercing studio", "Lagos tattoo", "custom tattoo", "fine line tattoo"],
  openGraph: {
    title: "Inked Attraction",
    description:
      "Custom tattoos and precision piercings in Lagos, Nigeria — designed with artistry, care, and longevity in mind.",
    type: "website",
    siteName: "Inked Attraction",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inked Attraction",
    description: "Custom tattoos and precision piercings in Lagos, Nigeria.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-void font-body text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
