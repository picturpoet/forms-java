/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        garamond: ['EB Garamond', 'Garamond', 'serif'],
      },
      colors: {
        // New brand palette from senior dev
        brand: {
          dark: '#44087D',    // Primary brand color for buttons, links, accents
          light: '#E6E6F8',   // Surface fills, subtle backgrounds
        },
        grey: '#727D85',      // Disabled states, borders
        text: {
          DEFAULT: '#000000', // Primary body copy
          light: '#727D85',   // Secondary text using grey
          dark: '#F5F5F5',    // Dark mode text
        },
        'mna-yellow': '#F2BA46',  // Positive highlights, success states
        'mna-orange': '#F2AA5C',  // Warnings, secondary CTAs
        
        // Dark mode background layers
        'bg-layer': '#321B4A',    // Dark mode background layer
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.04)',
        focus: '0 0 0 4px rgba(68,8,125,0.4)',
        lg: '0 10px 25px rgba(0,0,0,0.08)',
        xl: '0 20px 40px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}