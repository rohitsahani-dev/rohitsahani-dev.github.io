import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        panel: "#111117",
        "panel-soft": "#141421",
        stroke: "rgba(255,255,255,0.1)",
        accent: {
          DEFAULT: "#a855f7",
          soft: "#c084fc",
          deep: "#6d28d9"
        },
        muted: "#9ca3af"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(168,85,247,0.14), 0 20px 60px rgba(76,29,149,0.35)",
        card: "0 16px 48px rgba(0,0,0,0.36)"
      },
      backgroundImage: {
        "page-radial":
          "radial-gradient(circle at top right, rgba(168,85,247,0.18), transparent 30%), radial-gradient(circle at 12% 20%, rgba(59,130,246,0.12), transparent 32%), linear-gradient(180deg, #0a0a0a 0%, #070709 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(168,85,247,0.25)" },
          "50%": { boxShadow: "0 0 0 10px rgba(168,85,247,0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite"
      }
    }
  },
  plugins: [animate]
};

export default config;
