// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: {
          bg: {
            light: "#ffffff",
            dark: "#222222"
          },
          text: {
            light: "#4d4d4d",
            dark: "#red"
          }
        }
      }
    }
  },
  plugins: []
};
