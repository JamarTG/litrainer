/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: '#1a202c',
        accent: "#277F71",  // green
        primary: "#282828", // blobs
        secondary: "#2F2E2E",
        tertiary: "#424242",
        offWhite: "#c9c8c7",
      },
    },
  },
  plugins: [],
}

