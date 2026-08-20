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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Inked Attraction Tattoo & Piercing Studio",
  areaServed: "Lagos, Lagos State, Nigeria",
  telephone: "+234 813 038-1326",
  email: "towobolaelizabeth79@gmail.com",
  sameAs: ["https://wa.me/2348130381326?text=Hi%2C%20I%27d%20like%20to%20book%20a%20tattoo%20or%20piercing%20session%20at%20Inked%20Attraction."],
  ...(siteUrl ? { url: siteUrl } : {}),
};

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Inked Attraction Tattoo & Piercing Studio — Lagos",
    template: "%s | Inked Attraction",
  },
  description:
    "Inked Attraction Tattoo & Piercing Studio in Lagos offers custom tattoos and professional piercings shaped through consultation, creativity, precision, and care.",
  keywords: ["tattoo studio", "piercing studio", "Lagos tattoo", "custom tattoo", "fine line tattoo"],
  openGraph: {
    title: "Inked Attraction",
    description:
      "Custom tattoos and precision piercings in Lagos, Nigeria — shaped through consultation with artistry, care, and attention to detail.",
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
        <StaticNetlifyForms />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

function StaticNetlifyForms() {
  return (
    <div hidden aria-hidden="true">
      <form name="tattoo-booking" data-netlify="true" data-netlify-honeypot="bot-field" method="POST">
        <input type="hidden" name="form-name" value="tattoo-booking" />
        <input name="bot-field" />
        {[
          "serviceType", "artist", "style", "placement", "size", "budget", "preferredDate",
          "timeOfDay", "notes", "files", "name", "email", "phone",
        ].map((name) => <input key={name} name={name} />)}
      </form>
      <form name="piercing-booking" data-netlify="true" data-netlify-honeypot="bot-field" method="POST">
        <input type="hidden" name="form-name" value="piercing-booking" />
        <input name="bot-field" />
        {[
          "serviceType", "piercingLocation", "earPart", "earSide", "noseDetail", "navelDetail",
          "nippleDetail", "locationDetail", "jewelryPreference", "jewelryMaterial", "gauge", "preferredDate", "timeOfDay", "notes", "name", "email", "phone",
        ].map((name) => <input key={name} name={name} />)}
      </form>
      <form name="contact-inquiry" data-netlify="true" data-netlify-honeypot="bot-field" method="POST">
        <input type="hidden" name="form-name" value="contact-inquiry" />
        <input name="bot-field" />
        {['name', 'email', 'phone', 'subject', 'message'].map((name) => <input key={name} name={name} />)}
      </form>
    </div>
  );
}
