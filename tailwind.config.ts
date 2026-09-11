import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F4EF",
        ink: {
          DEFAULT: "#1B1D22",
          soft: "#4B4D54",
        },
        cobalt: {
          DEFAULT: "#3D5AFE",
          hover: "#2A45E2",
        },
        coral: {
          DEFAULT: "#FF6B3D",
        },
        stone: {
          border: "#C9C4B8",
          DEFAULT: "#C9C4B8",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Fraunces",
          "Georgia",
          "serif",
        ],
        body: [
          "var(--font-body)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        wrap: "1240px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.16,1,0.3,1) both",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
