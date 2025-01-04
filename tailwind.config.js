/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#3B82F6',    
        secondary: '#F59E0B',  
        tertiary: '#10B981',  
        background: '#F9FAFB',
        dark: '#1F2937',     
        separator: '#D3D3D3',
        core: '#11151C',
        supportive: '#212D40',
        additional: '#59A5D8',
        base: '#364156',
        accent: '#84D2F6',
        textcolor: '#F9FAFB'
      },
    },
  },
  plugins: [],
}