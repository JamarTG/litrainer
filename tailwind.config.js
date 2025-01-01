/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: "#1A1A1A", // Changed to a slightly lighter grey
        accent: "#287F71",  // green
        primary: "#111111", // blobs
        secondary: "#191919",
        tertiary: "#2D2D2D",
        quaternary: "#222222",
        shadowGray: "#2a2a2a",
        cloudGray: "#b4b4b4",
        offWhite: "#FAFAFA",
        muted: "#606060"
      },
    },
  },
  plugins: [],
}

