import type { MetadataRoute } from "next";
import { artists, blogPosts } from "@/lib/data";

const base = "https://inkedattraction.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/artists", "/styles", "/gallery", "/booking",
    "/pricing", "/about", "/faq", "/contact", "/blog",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const artistRoutes = artists.map((a) => ({
    url: `${base}/artists/${a.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...artistRoutes, ...blogRoutes];
}
