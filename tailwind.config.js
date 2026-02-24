/** @type {import(''tailwindcss'').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9f6",
          100: "#dcf1e9",
          200: "#bbe2d5",
          300: "#8ecab8",
          400: "#5ba693",
          500: "#1b7f5f", // Primary brand color
          600: "#15674e",
          700: "#12523f",
          800: "#0f4234",
          900: "#0d3f2f",
          950: "#05221a",
        },
        slate: {
          950: "#020617",
        }
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
      }
    }
  },
  plugins: []
};
