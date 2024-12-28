/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        2: 2,
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        overlock: ["Overlock", "serif"],
      },
    },
  },
  plugins: [],
};
