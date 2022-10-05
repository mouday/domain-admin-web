/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {},

    margin: {
      sm: '10px',
      md: '20px',
      lg: '40px',
      xl: '80px',
    },
  },
  plugins: [],
}
