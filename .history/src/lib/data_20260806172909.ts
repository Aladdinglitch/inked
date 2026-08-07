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
    artistSlug: "elizabeth-adedayo-towobola",
    styleSlug: "custom-tattoos",
    title: "Hollow Bloom",
    aspect: "portrait",
    seed: 1,
  },
  {
    id: "piece-2",
    artistSlug: "elizabeth-adedayo-towobola",
    styleSlug: "custom-tattoos",
    title: "Quiet Static",
    aspect: "wide",
    seed: 2,
  },
  {
    id: "piece-3",
    artistSlug: "elizabeth-adedayo-towobola",
    styleSlug: "custom-tattoos",
    title: "Ember Line",
    aspect: "tall",
    seed: 3,
  },
  {
    id: "piece-4",
    artistSlug: "elizabeth-adedayo-towobola",
    styleSlug: "custom-tattoos",
    title: "Salt & Bone",
    aspect: "square",
    seed: 4,
  },
  {
    id: "piece-5",
    artistSlug: "elizabeth-adedayo-towobola",
    styleSlug: "custom-tattoos",
    title: "Low Tide",
    aspect: "portrait",
    seed: 5,
  },
  {
    id: "piece-6",
    artistSlug: "elizabeth-adedayo-towobola",
    styleSlug: "custom-tattoos",
    title: "Split Oak",
    aspect: "wide",
    seed: 6,
  },
  {
    id: "piece-7",
    artistSlug: "elizabeth-adedayo-towobola",
    styleSlug: "custom-tattoos",
    title: "Ash Field",
    aspect: "tall",
    seed: 7,
  },
  {
    id: "piece-8",
    artistSlug: "elizabeth-adedayo-towobola",
    styleSlug: "custom-tattoos",
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
      "Elizabeth guided me through a thoughtful design process and the final piece feels personal, clean, and timeless.",
    artistSlug: "elizabeth-adedayo-towobola",
    rating: 5,
  },
  {
    name: "Femi O.",
    quote:
      "The consultation was calm, detailed, and honest. I felt confident throughout the process and loved the final result.",
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
