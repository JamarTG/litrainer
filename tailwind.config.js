/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: "#1A1A1A", // Changed to a slightly lighter grey
        accent: "#277F71",  // green
        primary: "#282828", // blobs
        secondary: "#2F2E2E",
        tertiary: "#424242",
        offWhite: "#FAFAFA",
      },
    },
  },
  plugins: [],
}

