/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/artists/mock-artist-one", destination: "/artists", permanent: true },
      { source: "/artists/mock-artist-two", destination: "/artists", permanent: true },
    ];
  },
  images: {
    // No external photo sources are used — all imagery is generated
    // in-code as original SVG "linework" art, so no remotePatterns
    // are required. Add domains here if real photography is added later.
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
