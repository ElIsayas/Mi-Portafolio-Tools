/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6c63ff",
        secondary: "#ff6584",
        dark: "#0f0f0f",
        card: "#1a1a1a",
      },
      fontFamily: {
        sans: ["Poppins", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 35px rgba(108, 99, 255, 0.35)",
      },
      keyframes: {
        slideInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "slide-in-up": "slideInUp 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};
