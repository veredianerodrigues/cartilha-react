/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1D4355',
        'brand-darker': '#163341',
        'brand-blue': '#289DD2',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        worksans: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
