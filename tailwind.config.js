/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.{html,js}'],

  theme: {
    extend: {
      colors: {
        'primary-color': '#fd5342',
      },
    },
    fontFamily: {
      dosis: ['Dosis', 'sans-serif'],
    },
  },
  plugins: [],
};
