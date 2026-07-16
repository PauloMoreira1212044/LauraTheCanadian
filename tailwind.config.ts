import type { Config } from "tailwindcss";

/**
 * Confetti-inspired palette. Tweak these to re-theme the whole page.
 * coral/pink + warm yellow + teal + soft lilac over a light background.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: "#ff7a8a",
        pink: "#ff9ec4",
        sunny: "#ffd166",
        teal: "#2ec4b6",
        lilac: "#b8a4ff",
        cream: "#fff7fb",
      },
      fontFamily: {
        // Wired up to next/font CSS variables in app/layout.tsx
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(80, 40, 80, 0.35)",
        frame: "0 18px 40px -14px rgba(80, 40, 80, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
