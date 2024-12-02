/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        darkBackground: "#343541",

        primary: "#1E3A8A", 
        secondary: "#10B981", 
        accent: "#F59E0B",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"], 
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
