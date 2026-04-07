/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aqi: {
          good:       '#78d64b', // AQI 1
          fair:       '#f0e040', // AQI 2
          moderate:   '#f77f00', // AQI 3
          poor:       '#d62828', // AQI 4
          very_poor:  '#7b2d8b', // AQI 5
        },
      },
    },
  },
  plugins: [],
}
