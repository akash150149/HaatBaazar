/** @type {import(''tailwindcss'').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#edf7f2",
          100: "#d4ecdf",
          500: "#1b7f5f",
          700: "#155f47",
          900: "#0d3f2f"
        }
      }
    }
  },
  plugins: []
};
