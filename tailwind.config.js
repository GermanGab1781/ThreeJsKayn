/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'cinzel': ['"Cinzel"', 'serif'],
        'Pmarker':['"Permanent Marker"', 'cursive'],
        'lugra':['"Lugrasimo"', 'cursive']
      }
    },
  },
  plugins: [],
}

