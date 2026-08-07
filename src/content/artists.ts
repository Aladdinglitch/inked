export type Artist = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  years: number;
  image: string;
  featured?: boolean;
};

export const artists: Artist[] = [
  {
    id: "a1",
    slug: "elizabeth-adedayo-towobola",
    name: "Elizabeth Adedayo Towobola",
    role: "Founder & Lead Artist",
    bio: "Elizabeth is the owner, founder, and lead artist of Inked Attraction. Her work blends custom design, fine-line detail, cover-ups, and professional piercing care into a calm, highly personal studio experience.",
    specialties: ["Custom Tattoos", "Fine Line", "Cover-ups", "Piercings"],
    years: 3,
    image: "/images/artist1.jpg",
    featured: true,
  },
];

export function getArtist(slug: string) {
  return artists.find((a) => a.slug === slug);
}
