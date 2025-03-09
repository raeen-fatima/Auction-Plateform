
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#274c77',
        secondary: '#a53860',
        teritory: '#da627d',
      },
      fontFamily: {
        playfair: ['playfair'],
      },
    },
  },
  plugins: [],
}