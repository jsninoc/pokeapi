/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-yellow": "#FFCC00",
        "secondary-yellow": "#D5A100",
        "primary-blue": "#0A285F",
        "secondary-blue": "#0075BE",
        "accent": "#CE2211"
      }
    },
  },
  plugins: [],
}
