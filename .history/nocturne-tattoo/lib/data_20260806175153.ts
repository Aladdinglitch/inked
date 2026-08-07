// Real studio content for Inked Attraction Tattoo & Piercing Studio.

export type ArtStyle = {
  slug: string;
  name: string;
  icon: string; // lucide-react icon name
  blurb: string;
  description: string;
};

export const styles: ArtStyle[] = [
  {
    slug: "custom-tattoos",
    name: "Custom Tattoos",
    icon: "Sparkles",
    blurb: "Bespoke body art built around your story.",
    description:
      "Custom tattoos shaped around your story, placement, and personal style — from meaningful symbols to full compositions that feel calm and intentional.",
  },
  {
    slug: "fine-line",
    name: "Fine Line",
    icon: "Feather",
    blurb: "Delicate detail with elegance and clarity.",
    description:
      "Fine-line work designed for a refined, minimal look with strong legibility and careful placement.",
  },
  {
    slug: "cover-ups",
    name: "Cover-Ups",
    icon: "PenTool",
    blurb: "Thoughtful redesigns that make old work feel new.",
    description:
      "Cover-up consultations are approached with honesty, planning, and a focus on transforming existing tattoos into something that feels fresh and confident.",
  },
  {
    slug: "piercings",
    name: "Piercings",
    icon: "Waves",
    blurb: "Professional piercing care with clean, calm execution.",
    description:
      "Piercing appointments are carried out with careful aftercare guidance, hygiene standards, and a calm studio experience from start to finish.",
  },
];

export type Artist = {
  slug: string;
  name: string;
  role: string;
  styleSlugs: string[];
  years: number;
  bio: string;
  longBio: string;
  handle: string;
  featured: boolean;
  booksOpen: boolean;
};

export const artists: Artist[] = [
  {
    slug: "elizabeth-adedayo-towobola",
    name: "Elizabeth Adedayo Towobola",
    role: "Owner, Founder & Lead Artist",
    styleSlugs: ["custom-tattoos", "fine-line", "cover-ups", "piercings"],
    years: 3,
    bio: "Owner, founder, and lead artist of Inked Attraction.",
    longBio:
      "Elizabeth Adedayo Towobola is the owner, founder, and lead artist of Inked Attraction Tattoo & Piercing Studio. Her work blends custom tattoos, fine-line detail, cover-ups, and professional piercing care into a calm, highly personal studio experience.",
    handle: "@inked_attraction",
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

const aspects: GalleryPiece["aspect"][] = ["square", "portrait", "tall", "wide"];
const titleWords = [
  "Hollow Bloom", "Quiet Static", "Ember Line", "Salt & Bone", "Low Tide",
  "Split Oak", "Ash Field", "Wire Moth", "Marrow", "Dust Compass",
  "Night Chart", "Rib Line", "Slow Bloom", "Faultline", "Vellum",
  "Cinder", "Half Moon Study", "Grain", "Undertow", "Loose Thread",
];

const fwcImages = [
  "/images/porfolio/po1.jpeg",
  "/images/fwc2.jpg",
  "/images/fwc3.jpg",
  "/images/fwc4.jpg",
  "/images/fwc5.jpg",
  "/images/fwc6.jpg",
];

const portfolioImages = [
  "/images/fwc0.jpg",
  "/images/porfolio/po2.jpg",
  "/images/porfolio/po3.jpg",
  "/images/porfolio/po4.jpg",
  "/images/porfolio/po5.jpeg",
  "/images/porfolio/po6.jpg",
  "/images/porfolio/po7.jpg",
  "/images/porfolio/po8.jpg",
  "/images/porfolio/po9.jpg",
  "/images/porfolio/po11.jpeg",
  "/images/porfolio/po12.jpg",
  "/images/porfolio/po13.jpg",
  "/images/porfolio/po15.jpg",
  "/images/porfolio/po16.jpg",
  "/images/porfolio/po17.jpg",
  "/images/porfolio/po18.jpeg",
  "/images/porfolio/po19.jpg",
  "/images/porfolio/po1.jpeg",
];

export const gallery: GalleryPiece[] = Array.from({ length: 24 }).map((_, i) => {
  const artist = artists[i % artists.length];
  const style = artist.styleSlugs[i % artist.styleSlugs.length];
  let image: string | undefined;
  
  if (i < 6) {
    image = fwcImages[i];
  } else if (i < 24) {
    image = portfolioImages[i - 6];
  }
  
  return {
    id: `piece-${i + 1}`,
    artistSlug: artist.slug,
    styleSlug: style,
    title: titleWords[i % titleWords.length],
    aspect: aspects[i % aspects.length],
    seed: i + 1,
    image,
  };
});

export type Testimonial = {
  name: string;
  quote: string;
  artistSlug: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Chidera A.",
    quote:
      "Elizabeth helped me shape a design that felt personal, clean, and timeless. The process was calm, clear, and beautifully executed.",
    artistSlug: "elizabeth-adedayo-towobola",
    rating: 5,
  },
  {
    name: "Femi O.",
    quote:
      "The consultation was thoughtful and honest, and the final piece feels like it belongs to me.",
    artistSlug: "elizabeth-adedayo-towobola",
    rating: 5,
  },
  {
    name: "Grace T.",
    quote:
      "Every step felt professional and intentional, from the design planning to the aftercare guidance.",
    artistSlug: "elizabeth-adedayo-towobola",
    rating: 5,
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
    name: "Small Piece",
    price: "₦45,000",
    unit: "starting",
    description: "Palm-sized or smaller — a single session, usually under an hour.",
    features: ["Up to 3 inches", "One sitting", "Free touch-up within 60 days", "Aftercare kit included"],
  },
  {
    name: "Medium Piece",
    price: "₦120,000",
    unit: "starting",
    description: "Forearm or calf-sized detail work, typically a half-day session.",
    features: ["3–8 inches", "One to two sittings", "Free touch-up within 60 days", "Aftercare kit included"],
    highlight: true,
  },
  {
    name: "Large / Custom",
    price: "₦35,000",
    unit: "per hour",
    description: "Sleeves, backpieces, and multi-session custom work, billed hourly.",
    features: ["Unlimited size", "Multi-session planning", "Dedicated design consult", "Priority rebooking"],
  },
  {
    name: "Studio Day Rate",
    price: "₦280,000",
    unit: "per day",
    description: "Full-day booking with one artist for large-scale or travelling clients.",
    features: ["6–7 hour session", "Private room", "Break-neck project focus", "Includes one revision round"],
  },
];

export const pricingPolicies = [
  "A non-refundable deposit (deducted from the final price) confirms every booking.",
  "Final price depends on size, placement, detail, and session count — quoted after consult.",
  "Rescheduling needs at least 48 hours' notice or the deposit is forfeited.",
  "Touch-ups are free within 60 days of the original session for work healed as instructed.",
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
      "See the Pricing page for our standard tiers. Custom and large-scale work is quoted after a consult, since size, detail, and placement all move the number.",
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
      "A deposit confirms any booking and is deducted from the final price. It's non-refundable but transferable once if you reschedule with 48 hours' notice.",
  },
  {
    question: "Is the studio safe and sterile?",
    answer:
      "All equipment is single-use or autoclave-sterilised between every client, and every artist holds a current bloodborne pathogen certification, renewed annually.",
  },
  {
    question: "Can I get a tattoo covered up?",
    answer:
      "Often, yes — bring photos of the existing piece through the booking form and we'll advise honestly on what's achievable before you commit to a design.",
  },
  {
    question: "What age do I need to be?",
    answer:
      "18 with valid photo ID, no exceptions, regardless of parental consent.",
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

export const placements = [
  "Forearm", "Upper Arm", "Shoulder", "Chest", "Back", "Ribs",
  "Thigh", "Calf", "Ankle", "Hand", "Neck", "Full Sleeve",
];

export const sizeOptions = [
  "Small (under 3\")", "Medium (3\"–8\")", "Large (8\"–14\")", "Full sleeve / backpiece",
];

export const budgetRanges = [
  "₦45,000 – ₦100,000", "₦100,000 – ₦250,000", "₦250,000 – ₦500,000", "₦500,000+",
];
