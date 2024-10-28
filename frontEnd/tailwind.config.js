/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0070cd",
        secondary: "#eef0f2",
        lightRed: "#ef0f0f",
        darkRed: "#ae0d0d",
        grayIcons: "#aeaeac",
        darkGrayText: "#666666",
        lightGrayText: "#7c8a9d",
        lightBlue: "#e6f1ff",
      },
    },
  },
  plugins: [],
};
