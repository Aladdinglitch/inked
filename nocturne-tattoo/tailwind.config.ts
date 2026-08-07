import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        // Core token system — Modern Luxury Minimalist
        void: "#0a0908", // matte black background
        surface: "#f8f6f3", // premium light surface
        ink: "#2a2622", // deep charcoal text
        border: "#e8e4df", // refined border
        fg: "#1a1815", // primary text (nearly black, warm)
        muted: "#8a8178", // secondary text (warmer gray)
        gold: {
          DEFAULT: "#d4af57", // luxe gold (elevated tone)
          bright: "#e8c95f", // bright accent
          dim: "#a68947", // dim/hover state
        },
        platinum: {
          DEFAULT: "#e8e8e8",
          light: "#f5f5f5",
          dark: "#d4d4d4",
        },
        cream: {
          DEFAULT: "#faf8f5",
          dark: "#f5f1ed",
        },
        oxblood: {
          DEFAULT: "#8b3a3a",
          bright: "#b84848",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: ".28em",
      },
      backgroundImage: {
        "grain": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA0IDAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiLz48L3N2Zz4=')",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 0 0 rgba(201, 162, 75, 0.4)" },
          "100%": { boxShadow: "0 0 0 10px rgba(201, 162, 75, 0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        "fade-up": "fade-up .8s cubic-bezier(.16,1,.3,1) forwards",
        "shimmer": "shimmer 1.8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-out infinite",
        "gradient-shift": "gradient-shift 3s ease-in-out infinite",
        "shake": "shake 0.4s ease-in-out",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
