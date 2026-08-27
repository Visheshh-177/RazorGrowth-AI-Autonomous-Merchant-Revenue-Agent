import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        card: "#121215",
        "card-hover": "#17171C",
        sidebar: "#0C0C0E",
        border: "#27272A",
        brand: {
          gold: "#E5A93B",
          goldHover: "#C8912A",
          orange: "#F97316",
          blue: "#3B82F6",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
