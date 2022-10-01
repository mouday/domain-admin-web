/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  content: [],
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
