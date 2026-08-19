export const SITE = {
  name: "Inked Attraction Tattoo & Piercing Studio",
  tagline: "Crafted with precision. Inspired by you.",
  description:
    "Inked Attraction Tattoo & Piercing Studio is a bespoke tattoo and piercing studio led by Elizabeth Adedayo Towobola, offering custom tattoos, fine-line work, cover-ups, and professional piercings.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  email: "Studio@InkedAttraction.com",
  phone: "+234 813 038-1326",
  address: "Lagos, Lagos State",
  city: "Lagos, Nigeria",
  hours: [
    { day: "Monday – Saturday", time: "10:00 – 22:00" },
    { day: "Sunday", time: "14:00 – 21:00" },
  ],
  socials: {
    instagram: "https://www.instagram.com/inked_attraction",
    tiktok: "https://www.tiktok.com/@inked_attraction",
    facebook: "https://www.facebook.com/inked.Attraction",
  },
} as const;

export const NAV_LINKS = [
  { href: "/artists", label: "Artists" },
  { href: "/styles", label: "Styles" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
