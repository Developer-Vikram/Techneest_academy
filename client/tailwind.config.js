/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Legacy tokens (still used by the user panel) */
        primary: "#2563EB", // blue
        accent: "#22C55E", // green
        dark: "#0F172A",
        light: "#F8FAFC",

        /* Techneest brand palette — derived from the logo */
        canvas: "#F7F9FF",
        navy: "#0A1530",
        brand: {
          DEFAULT: "#1D6BFF",
          dark: "#155AE0",
        },
        aqua: "#22D3EE" /* cyan accent */,
        iris: "#5B3DF5" /* indigo / violet */,
        warm: "#FF8A3D" /* orange accent (sparingly) */,
        magenta: "#D946EF" /* magenta accent (gradients only) */,
        soft: "#EEF3FF",
        softdeep: "#D9E4FF",
        line: "#E3E8F5",
        muted: "#4A5568",
      },

      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
      },

      boxShadow: {
        premium: "0 10px 40px rgba(37,99,235,0.25)",
        card: "0 1px 2px rgba(10,21,48,0.04), 0 8px 24px -12px rgba(10,21,48,0.12)",
        lift: "0 20px 40px -20px rgba(29,107,255,0.45)",
      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #22D3EE 0%, #1D6BFF 50%, #5B3DF5 100%)",
        "brand-gradient-r":
          "linear-gradient(135deg, #22D3EE 0%, #1D6BFF 55%, #5B3DF5 100%)",
        "warm-gradient": "linear-gradient(90deg, #FF8A3D 0%, #D946EF 100%)",
      },

      animation: {
        scroll: "scroll 25s linear infinite",
        gradientMove: "gradientMove 4s linear infinite",
      },

      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
