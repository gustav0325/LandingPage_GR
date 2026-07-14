/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gr-dark": "#0F172A",
        "gr-blue": "#1E40AF",
        "gr-sand": "#FBF8F3",
        "gr-gold": "#D4AF37",
        "gr-paragraph": "#64748B",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        load: {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        slideFromLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        }
      },
      animation: {
        'load': 'load 10s linear forwards',
        'slide-left': 'slideFromLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards'
      }
    },
  },
  plugins: [],
}