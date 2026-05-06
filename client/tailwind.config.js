/** @type {import('tailwindcss').Config} */

/**
 * PikNode — Tailwind CSS Configuration
 * =======================================
 * Custom "Agri-Tech" design system.
 *
 * Design Language:
 *  - Deep forest greens as primary authority colors
 *  - Warm harvest golds as accent / CTA colors
 *  - Terracotta earth tones for warnings and soil-data UI
 *  - High-contrast off-whites for accessible typography on dark backgrounds
 *  - Stone/slate neutrals for cards and surfaces
 *
 * Accessibility: All color pairings meet WCAG AA (4.5:1) contrast ratio.
 * Palette named after agricultural concepts for cultural resonance.
 */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // ── Custom Color Palette ──────────────────────────────────────
      colors: {
        // Primary — Deep Forest / Jungle Greens
        forest: {
          50:  "#f0faf0",
          100: "#d8f3d8",
          200: "#b1e6b1",
          300: "#79d179",
          400: "#46b546",
          500: "#2d9e2d",  // Brand primary
          600: "#1f7a1f",
          700: "#185c18",
          800: "#124812",
          900: "#0c330c",
          950: "#071a07",
        },

        // Secondary — Leaf / Lime Greens (tech-forward accent)
        leaf: {
          50:  "#f5fde8",
          100: "#e8fac5",
          200: "#d0f491",
          300: "#b0e856",
          400: "#92d42a",
          500: "#74b816",  // Highlight green
          600: "#5a9210",
          700: "#446d0e",
          800: "#375810",
          900: "#2e4a12",
          950: "#162806",
        },

        // Accent — Harvest Gold / Wheat
        harvest: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",  // Primary CTA / Alert accent
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },

        // Warning / Soil — Terracotta Earth
        earth: {
          50:  "#fdf5f0",
          100: "#fce8da",
          200: "#f8cdb4",
          300: "#f3a97f",
          400: "#ec7c48",
          500: "#e45a24",  // Critical alert, soil data
          600: "#d44416",
          700: "#b03413",
          800: "#8c2c14",
          900: "#712714",
          950: "#3d1009",
        },

        // Neutral Surfaces — Stone / Slate (for cards, sidebar)
        stone: {
          50:  "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },

        // Sky / Water — for humidity, irrigation data
        sky: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },

      // ── Typography ────────────────────────────────────────────────
      fontFamily: {
        // Display: Bold headings — Outfit has a distinctive geometric quality
        display: ["'Outfit'", "sans-serif"],
        // Body: Highly legible for farmers reading in variable light
        body: ["'DM Sans'", "sans-serif"],
        // Monospace: Telemetry data, coordinates
        mono: ["'JetBrains Mono'", "monospace"],
      },

      fontSize: {
        // Larger base sizes for accessibility in field conditions
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "field-sm": ["0.9375rem", { lineHeight: "1.5rem" }],  // 15px — min readable outdoors
        "field-base": ["1.0625rem", { lineHeight: "1.75rem" }], // 17px
        "field-lg": ["1.1875rem", { lineHeight: "1.875rem" }],  // 19px
      },

      // ── Spacing ───────────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
        "sidebar": "16rem", // Sidebar width
      },

      // ── Border Radius ─────────────────────────────────────────────
      borderRadius: {
        "card": "1rem",       // Module cards
        "widget": "1.5rem",   // Bento boxes
        "orb": "50%",         // Maitra pulsing orb
      },

      // ── Box Shadows ───────────────────────────────────────────────
      boxShadow: {
        "card": "0 4px 24px -4px rgba(0,0,0,0.18), 0 1px 4px -1px rgba(0,0,0,0.1)",
        "card-hover": "0 12px 40px -8px rgba(0,0,0,0.28), 0 4px 12px -2px rgba(0,0,0,0.12)",
        "orb-idle": "0 0 24px 8px rgba(45, 158, 45, 0.3)",
        "orb-active": "0 0 48px 16px rgba(116, 184, 22, 0.5)",
        "critical": "0 0 20px 4px rgba(228, 90, 36, 0.35)",
        "harvest-glow": "0 0 20px 4px rgba(245, 158, 11, 0.35)",
      },

      // ── Animations ────────────────────────────────────────────────
      keyframes: {
        "pulse-orb": {
          "0%, 100%": { boxShadow: "0 0 24px 8px rgba(45,158,45,0.3)", transform: "scale(1)" },
          "50%": { boxShadow: "0 0 48px 20px rgba(116,184,22,0.55)", transform: "scale(1.06)" },
        },
        "data-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-orb": "pulse-orb 2.4s ease-in-out infinite",
        "data-scroll": "data-scroll 12s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-up": "fade-up 0.4s ease-out forwards",
      },

      // ── Background Images ─────────────────────────────────────────
      backgroundImage: {
        "agri-gradient": "linear-gradient(135deg, #0c330c 0%, #1f7a1f 50%, #2d9e2d 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
      },
    },
  },

  plugins: [],
};