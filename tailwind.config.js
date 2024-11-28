/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#3B82F6',    // Bright blue (clear skies)
        secondary: '#F59E0B',  // Warm gold (sunny)
        tertiary: '#10B981',   // Soft green (mild weather)
        accent: '#F43F5E',     // Vibrant red (rain/storm)
        background: '#F9FAFB', // Light gray (background)
        dark: '#1F2937',       // Dark charcoal (text and accents)
      },
    },
  },
  plugins: [],
}