import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070D",
          900: "#0B0F1A",
          800: "#111726",
          700: "#1A2235",
          600: "#28324A",
        },
        signal: {
          DEFAULT: "#22E584",
          dim: "#17B368",
          soft: "#0F2A21",
        },
        pulse: {
          DEFAULT: "#7C5CFC",
          dim: "#5E42D6",
          soft: "#1C1738",
        },
        gold: {
          DEFAULT: "#F2B84B",
          soft: "#2E2410",
        },
        paper: "#F5F7FA",
        mute: "#8B93A7",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34, 229, 132, 0.35)",
        "glow-violet": "0 0 40px -10px rgba(124, 92, 252, 0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(245,247,250,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(245,247,250,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scan-line": "scan-line 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
