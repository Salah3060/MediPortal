/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#253237",
        secondary: "#5c6b73",
        tertiary: "#56d2d8",
        darkRed: "#ae0d0d",
        darkGrayText: "#666666",
        lightGrayText: "#7c8a9d",
      },
    },
  },
  plugins: [],
};
