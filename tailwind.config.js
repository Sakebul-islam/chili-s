/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#fd5342',
        'card-color': '#eff1f3',
      },
    },
    fontFamily: {
      dosis: ['Dosis', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
