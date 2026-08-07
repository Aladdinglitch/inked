// All content below is original and fictional — placeholder copy written
// for this project, not sourced from any real studio.

export type ArtStyle = {
  slug: string;
  name: string;
  icon: string; // lucide-react icon name
  blurb: string;
  description: string;
};

export const styles: ArtStyle[] = [
  {
    slug: "blackwork",
    name: "Blackwork",
    icon: "PenTool",
    blurb: "Bold solid ink, high contrast, built to last.",
    description:
      "Dense saturated fields of black built up in careful layers, used to carve strong graphic shapes into skin. We favour clean negative space over clutter, so the design reads clearly at any distance.",
  },
  {
    slug: "fine-line",
    name: "Fine Line",
    icon: "Feather",
    blurb: "Delicate single-needle work with quiet detail.",
    description:
      "Single-needle linework kept light and precise — botanical studies, portraiture, and script that sits close to the skin rather than shouting from across the room.",
  },
  {
    slug: "neo-traditional",
    name: "Neo-Traditional",
    icon: "Flame",
    blurb: "Bold outlines, saturated colour, illustrative flair.",
    description:
      "A modern take on the old bold-line tradition — heavier outlines, a deliberate colour palette, and illustrative detailing that gives every piece a sense of narrative.",
  },
  {
    slug: "ornamental",
    name: "Ornamental & Dotwork",
    icon: "Sparkles",
    blurb: "Pattern, symmetry, and stippled shading.",
    description:
      "Mandala structures, sacred geometry, and stippled dot-shading built from thousands of individual points — slow, meditative work rewarded with extraordinary texture.",
  },
  {
    slug: "realism",
    name: "Realism",
    icon: "Aperture",
    blurb: "Photographic depth in black, grey, or full colour.",
    description:
      "Portraits, wildlife, and still life rendered with photographic depth of field — soft grey-wash shading or full colour, always built from a proper reference sitting.",
  },
  {
    slug: "japanese",
    name: "Japanese-Influenced",
    icon: "Waves",
    blurb: "Large-scale composition rooted in classic motifs.",
    description:
      "Large-scale backpieces and sleeves composed around water, wind, and classic motifs — designed as one continuous piece rather than a collage of separate images.",
  },
  {
    slug: "script",
    name: "Script & Lettering",
    icon: "PenLine",
    blurb: "Custom hand type, from fine serif to bold marker.",
    description:
      "Custom lettering built for the body it sits on — we draw every word by hand rather than tracing a font, so spacing and weight read correctly at your chosen size.",
  },
  {
    slug: "geometric",
    name: "Geometric",
    icon: "Shapes",
    blurb: "Precision linework, architectural structure.",
    description:
      "Ruler-straight lines, exact angles, and architectural structure — pieces planned with the same rigor as a technical drawing, then executed freehand on the skin.",
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
    slug: "mara-voss",
    name: "Mara Voss",
    role: "Founder & Blackwork Lead",
    styleSlugs: ["blackwork", "ornamental"],
    years: 11,
    bio: "Bold solid-ink pieces with an architect's sense of negative space.",
    longBio:
      "Mara opened the studio after eight years working between Berlin and Lagos. Her work leans on restraint — she'll talk a client out of extra detail before she'll talk them into it. Known for large-scale blackwork panels that hold their shape for decades.",
    handle: "@mara.voss.ink",
    featured: true,
    booksOpen: true,
  },
  {
    slug: "theo-marchetti",
    name: "Theo Marchetti",
    role: "Realism Specialist",
    styleSlugs: ["realism", "neo-traditional"],
    years: 9,
    bio: "Photographic portraits with a painter's control of grey-wash.",
    longBio:
      "Theo trained as an oil painter before moving to skin. Every realism piece starts with a proper photo sitting in the studio's own light box, so shading holds up under any lighting once healed.",
    handle: "@theo.marchetti",
    featured: true,
    booksOpen: true,
  },
  {
    slug: "ren-akari",
    name: "Ren Akari",
    role: "Large-Scale & Japanese-Influenced",
    styleSlugs: ["japanese", "neo-traditional"],
    years: 13,
    bio: "Full backpieces and sleeves planned as a single composition.",
    longBio:
      "Ren apprenticed under a traditional tebori master before adopting the machine. Sleeves and backpieces are mapped out on paper first — sometimes over three or four consultations — before a single line touches skin.",
    handle: "@ren.akari.tattoo",
    featured: true,
    booksOpen: false,
  },
  {
    slug: "isla-conway",
    name: "Isla Conway",
    role: "Fine Line & Botanical",
    styleSlugs: ["fine-line", "script"],
    years: 6,
    bio: "Single-needle botanicals and lettering, kept light and precise.",
    longBio:
      "Isla's clients tend to be first-timers — her fine line work is calm, unhurried, and built for people who want something quiet rather than a statement piece.",
    handle: "@isla.conway",
    featured: true,
    booksOpen: true,
  },
  {
    slug: "dax-oyelaran",
    name: "Dax Oyelaran",
    role: "Geometric & Ornamental",
    styleSlugs: ["geometric", "ornamental"],
    years: 8,
    bio: "Ruler-precise geometry drawn freehand at full scale.",
    longBio:
      "Dax comes from a product design background, and it shows — every geometric piece is drafted to the millimetre before it's transferred, then executed entirely freehand.",
    handle: "@dax.draws",
    featured: false,
    booksOpen: true,
  },
  {
    slug: "priya-nathan",
    name: "Priya Nathan",
    role: "Neo-Traditional & Colour",
    styleSlugs: ["neo-traditional", "script"],
    years: 7,
    bio: "Saturated colour work with a bold illustrative outline.",
    longBio:
      "Priya's background in printmaking gives her colour work a flat, poster-like richness. She keeps a running sketchbook of flash designs available for walk-ins most weekends.",
    handle: "@priya.nathan.art",
    featured: false,
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
  "/images/fwc1.jpg",
  "/images/fwc2.jpg",
  "/images/fwc3.jpg",
  "/images/fwc4.jpg",
  "/images/fwc5.jpg",
  "/images/fwc6.jpg",
];

const portfolioImages = [
  "/images/porfolio/po1.jpeg",
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
      "Mara talked me out of a much busier design and the simpler version is exactly what I wanted a year later — still looks sharp, no blowout.",
    artistSlug: "mara-voss",
    rating: 5,
  },
  {
    name: "Femi O.",
    quote:
      "Theo's reference sitting made a real difference. The portrait held its detail even six months healed, which I wasn't expecting.",
    artistSlug: "theo-marchetti",
    rating: 5,
  },
  {
    name: "Grace T.",
    quote:
      "Three consultations before we started my sleeve and it was worth every one. Ren clearly plans in inches, not vibes.",
    artistSlug: "ren-akari",
    rating: 5,
  },
  {
    name: "Naomi K.",
    quote:
      "First tattoo, and Isla made the whole thing feel low-key. The line work is so much finer than I expected from photos.",
    artistSlug: "isla-conway",
    rating: 5,
  },
  {
    name: "Uche B.",
    quote:
      "Booked Dax for a geometric forearm piece — the symmetry is genuinely perfect, I've checked it against a ruler.",
    artistSlug: "dax-oyelaran",
    rating: 5,
  },
  {
    name: "Ada I.",
    quote:
      "Studio itself is spotless and calm, which mattered more than I thought it would for a four-hour session.",
    artistSlug: "priya-nathan",
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
      "Ren walks through how a large-scale Japanese-influenced backpiece gets planned, paced, and paid for across six months.",
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
