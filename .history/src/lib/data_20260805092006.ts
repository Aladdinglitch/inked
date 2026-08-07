export type GalleryPiece = {
  id: string;
  artistSlug: string;
  styleSlug: string;
  title: string;
  aspect: "square" | "portrait" | "tall" | "wide";
  seed: number;
  image?: string;
};

export const gallery: GalleryPiece[] = [
  {
    id: "piece-1",
    artistSlug: "mara-voss",
    styleSlug: "blackwork",
    title: "Hollow Bloom",
    aspect: "portrait",
    seed: 1,
  },
  {
    id: "piece-2",
    artistSlug: "theo-marchetti",
    styleSlug: "realism",
    title: "Quiet Static",
    aspect: "wide",
    seed: 2,
  },
  {
    id: "piece-3",
    artistSlug: "ren-akari",
    styleSlug: "japanese",
    title: "Ember Line",
    aspect: "tall",
    seed: 3,
  },
  {
    id: "piece-4",
    artistSlug: "isla-conway",
    styleSlug: "fine-line",
    title: "Salt & Bone",
    aspect: "square",
    seed: 4,
  },
  {
    id: "piece-5",
    artistSlug: "dax-oyelaran",
    styleSlug: "geometric",
    title: "Low Tide",
    aspect: "portrait",
    seed: 5,
  },
  {
    id: "piece-6",
    artistSlug: "priya-nathan",
    styleSlug: "neo-traditional",
    title: "Split Oak",
    aspect: "wide",
    seed: 6,
  },
  {
    id: "piece-7",
    artistSlug: "mara-voss",
    styleSlug: "ornamental",
    title: "Ash Field",
    aspect: "tall",
    seed: 7,
  },
  {
    id: "piece-8",
    artistSlug: "theo-marchetti",
    styleSlug: "realism",
    title: "Wire Moth",
    aspect: "square",
    seed: 8,
  },
];

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
];
