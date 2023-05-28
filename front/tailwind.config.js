/** @type {import('tailwindcss').Config} */
/**
 * Tablet: Samsung Galaxy Tab A
 * Screen resolution: 1920, 1200
 * Width when vertical = 1200
 * pixel per inch = 2.16, rounded
 * Viewport width when in use = vertical width / ppi = 1200 / 2.16 = 555.55px
 */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      tablet: "556px",
    },
  },
  plugins: [],
};
