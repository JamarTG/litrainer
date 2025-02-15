/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // enables class-based dark mode
  theme: {
    extend: {
      colors: {
        lightBg: "#ffffff",
        lightText: "#4d4d4d",
        darkBg: "#363434",
        darkText: "white",
      },
    },
  },
  plugins: [],
}

