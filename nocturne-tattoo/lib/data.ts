// Real studio content for Inked Attraction Tattoo & Piercing Studio.

export type ArtStyle = {
  slug: string;
  name: string;
  icon: string; // lucide-react icon name
  blurb: string;
  description: string;
  image?: string;
};

export const styles: ArtStyle[] = [
  {
    slug: "custom-tattoos",
    name: "Custom Tattoos",
    icon: "Sparkles",
    blurb: "Bespoke body art built around your story.",
    description:
      "Custom tattoos shaped around your story, placement, and personal style — from meaningful symbols to full compositions that feel calm and intentional.",
    image: "/images/styling/custom.png",
  },
  {
    slug: "fine-line",
    name: "Fine Line",
    icon: "Feather",
    blurb: "Delicate detail with elegance and clarity.",
    description:
      "Fine-line work designed for a refined, minimal look with strong legibility and careful placement.",
    image: "/images/styling/fineline.jpg",
  },
  {
    slug: "cover-ups",
    name: "Cover-Ups",
    icon: "PenTool",
    blurb: "Thoughtful redesigns that make old work feel new.",
    description:
      "Cover-up consultations are approached with honesty, planning, and a focus on transforming existing tattoos into something that feels fresh and confident.",
    image: "/images/styling/coverup.jpg",
  },
  {
    slug: "piercings",
    name: "Piercings",
    icon: "Waves",
    blurb: "Professional piercing care with clean, calm execution.",
    description:
      "Piercing appointments are carried out with careful aftercare guidance, hygiene standards, and a calm studio experience from start to finish.",
    image: "/images/styling/piercing.jpg",
  },
];

export type Artist = {
  slug: string;
  name: string;
  role: string;
  styleSlugs: string[];

  bio: string;
  longBio: string;

  image?: string;
  featured: boolean;
  booksOpen: boolean;
};

export const artists: Artist[] = [
  {
    slug: "elizabeth-adedayo-towobola",
    name: "Elizabeth Adedayo Towobola",
    role: "Owner, Founder & Lead Artist",
    styleSlugs: ["custom-tattoos", "fine-line", "cover-ups", "piercings"],

    bio: "Owner, founder, and lead artist of Inked Attraction.",
    longBio:
      "Elizabeth Adedayo Towobola is the owner, founder, and lead artist of Inked Attraction Tattoo & Piercing Studio. Her work blends custom tattoos, fine-line detail, cover-ups, and professional piercing care into a calm, highly personal studio experience.",

    image: "/images/artist/artist1.png",
    featured: true,
    booksOpen: true,
  },

];

export type GalleryPiece = {
  id: string;
  artistSlug: string;
  styleSlug: string;
  title: string;
  aspect: "square" | "portrait" | "tall" | "wide";
  seed: number;
  image?: string;
};

const galleryImages = [
  "/images/fwc1.jpg",
  "/images/fwc2.jpg",
  "/images/fwc3.jpg",
  "/images/fwc4.jpg",
  "/images/fwc5.jpg",
  "/images/fwc6.jpg",
];

export const gallery: GalleryPiece[] = galleryImages.map((image, index) => ({
  id: `piece-${index + 1}`,
  artistSlug: "",
  styleSlug: "custom-tattoos",
  title: `Portfolio image ${String(index + 1).padStart(2, "0")}`,
  aspect: index % 2 === 0 ? "portrait" : "square",
  seed: index + 1,
  image,
}));

export type Testimonial = {
  name: string;
  quote: string;
  attribution: "Client Testimonial";
};

export const testimonials: Testimonial[] = [
  {
    name: "Aladdin N.",
    quote: "Elizabeth took the time to refine my ideas into a clean, timeless, and deeply personal piece. The entire session was serene, straightforward, and expertly crafted.",
    attribution: "Client Testimonial",
  },
  {
    name: "Taven L.",
    quote: "The initial discussion was sincere and insightful, resulting in a custom tattoo that truly feels like an extension of myself.",
    attribution: "Client Testimonial",
  },
  {
    name: "Amir Danmusa.",
    quote: "Every phase was handled with clear focus and professionalism, starting from the preliminary design work all the way through to the detailed aftercare instructions.",
    attribution: "Client Testimonial",
  },
];

export type PricingTier = {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Tattoo consultation",
    price: "Available upon consultation",
    unit: "",
    description: "Pricing is assessed according to the requested service, design, placement, size, complexity, and session requirements.",
    features: ["Personalized quote", "Design discussion", "Placement and sizing guidance"],
  },
  {
    name: "Piercing consultation",
    price: "Available upon consultation",
    unit: "",
    description: "Discuss the requested piercing, jewellery preferences, relevant sizing, and appointment requirements.",
    features: ["Service assessment", "Jewellery discussion", "Aftercare guidance"],
  },
];

export const pricingPolicies = [
  "Booking & Consultation — Begin with a consultation so the requested service and requirements can be understood.",
  "Design & Consultation — Design, placement, size, complexity, and session requirements are reviewed before a personalized quote is provided.",
  "Appointment Confirmation — Appointment details are confirmed directly with the studio after consultation.",
  "Rescheduling & Cancellation — TODO(confirm-with-studio): Confirm the studio's approved rescheduling and cancellation policy.",
  "Deposits & Payments — TODO(confirm-with-studio): Confirm the studio's approved deposit, payment, and refund policy.",
  "Piercing Policy — Piercing requests are assessed according to location, jewellery preferences, sizing information, and appointment requirements.",
  "Aftercare — Aftercare guidance is provided for the booked service.",
  "Client Responsibility — Clients should provide accurate booking information and follow the studio's service and aftercare guidance.",
  "Policy Updates — The studio may update its customer policies as needed; the current version will be available through the website.",
];

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "How do I book a session?",
    answer:
      "Start on the Booking page — pick an artist and style, tell us roughly what you want, and we'll follow up within two business days to confirm details and take a deposit.",
  },
  {
    question: "Do you take walk-ins?",
    answer:
      "Limited flash-only walk-in slots run most Saturdays, subject to artist availability. Anything custom needs a booked consultation.",
  },
  {
    question: "What should I do before my appointment?",
    answer:
      "Sleep well, eat a proper meal beforehand, stay hydrated, and skip alcohol for 24 hours. Loose clothing that gives easy access to the placement helps too.",
  },
  {
    question: "How much does a tattoo cost?",
    answer:
      "Pricing is available upon consultation. Each booking is assessed according to the requested service, design, placement, size, complexity, and session requirements.",
  },
  {
    question: "Does it hurt, and how long does healing take?",
    answer:
      "Discomfort varies by placement and your own pain tolerance — bony areas read higher. Surface healing usually takes 2–3 weeks; full healing under the skin can take up to 6 months.",
  },
  {
    question: "Can I bring my own design?",
    answer:
      "Yes. Send references through the booking form's upload field and your artist will adapt it to suit the body's flow and their own style — we don't trace designs verbatim.",
  },
  {
    question: "What's your deposit and cancellation policy?",
    answer:
      "TODO(confirm-with-studio): Confirm the studio's approved deposit, payment, cancellation, refund, and rescheduling policy details.",
  },
  {
    question: "Is the studio safe and sterile?",
    answer:
      "The studio will provide service and aftercare information during consultation and appointment confirmation.",
  },
  {
    question: "Can I get a tattoo covered up?",
    answer:
      "Often, yes — bring photos of the existing piece through the booking form and we'll advise honestly on what's achievable before you commit to a design.",
  },
  {
    question: "What age do I need to be?",
    answer:
      "TODO(confirm-with-studio): Confirm the studio's approved age and identification policy before publishing specific requirements.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "healing-week-by-week",
    title: "Healing, Week by Week: What's Normal and What Isn't",
    excerpt:
      "A plain walkthrough of the first month — from the initial ooze to the deep-itch phase to the day your colours finally settle.",
    category: "Aftercare",
    date: "2026-06-02",
    readTime: "6 min read",
  },
  {
    slug: "choosing-a-placement",
    title: "Choosing a Placement That Ages With You",
    excerpt:
      "Ribs, forearms, and ankles all wear differently over twenty years. Here's how our artists actually think about placement.",
    category: "Guides",
    date: "2026-05-18",
    readTime: "5 min read",
  },
  {
    slug: "fine-line-longevity",
    title: "Does Fine Line Really Fade Faster?",
    excerpt:
      "A honest look at the longevity question every fine-line client asks, and what actually determines how a thin line holds up.",
    category: "Styles",
    date: "2026-04-30",
    readTime: "4 min read",
  },
  {
    slug: "first-tattoo-nerves",
    title: "First Tattoo Nerves: What Actually Helps",
    excerpt:
      "Notes from our front desk on the questions first-timers ask most, and the small things that make a first session easier.",
    category: "Guides",
    date: "2026-04-11",
    readTime: "5 min read",
  },
  {
    slug: "inside-a-backpiece",
    title: "Inside a Six-Session Backpiece, Start to Finish",
    excerpt:
      "Elizabeth walks through how a large-scale custom backpiece gets planned, paced, and paid for across six months.",
    category: "Process",
    date: "2026-03-22",
    readTime: "8 min read",
  },
  {
    slug: "sun-and-ink",
    title: "Sun, Chlorine, and Ink: Long-Term Colour Care",
    excerpt:
      "The habits that keep colour work vivid for a decade, and the ones that quietly wash it out.",
    category: "Aftercare",
    date: "2026-02-27",
    readTime: "4 min read",
  },
];

export const tattooPlacements = [
  "Forearm", "Upper Arm", "Shoulder", "Chest", "Back", "Ribs",
  "Thigh", "Calf", "Ankle", "Hand", "Neck", "Full Sleeve",
];

export const piercingLocations = [
  "Nose",
  "Navel",
  "Ear",
  "Tongue",
  "XXX-Section",
  "Nipple",
  "Chin",
  "Eyebrow",
];

export const sizeOptions = [
  "Small (under 3\")", "Medium (3\"–8\")", "Large (8\"–14\")", "Full sleeve / backpiece",
];

export const budgetRanges = [
  "Please discuss your budget during consultation",
];
