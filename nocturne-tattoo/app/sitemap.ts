import type { MetadataRoute } from "next";
import { artists, blogPosts } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const urlFor = (route: string) => siteUrl ? `${siteUrl}${route}` : route;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/artists", "/styles", "/gallery", "/booking",
    "/pricing", "/about", "/faq", "/contact", "/blog",
  ].map((route) => ({
    url: urlFor(route),
  }));

  const artistRoutes = artists.map((a) => ({
    url: urlFor(`/artists/${a.slug}`),
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: urlFor(`/blog/${p.slug}`),
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...artistRoutes, ...blogRoutes];
}
