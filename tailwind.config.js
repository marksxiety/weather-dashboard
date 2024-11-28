/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#3E2522',
        secondary: '#8C6E63',
        tertiary: '#D3A376',
        accent: '#FFE0B2',
        light: '#FFF2DF',
      },
    },
  },
  plugins: [],
}