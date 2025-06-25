/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom color palette
        primary: {
          DEFAULT: '#5B2C87', // Primary Dark Purple
          light: '#C8B5DB',   // Primary Light Purple
          50: '#F5F1F8',
          100: '#EBE1F0',
          200: '#D7C3E1',
          300: '#C8B5DB',
          400: '#A688C4',
          500: '#8B5BAD',
          600: '#5B2C87',
          700: '#4A2370',
          800: '#3A1C59',
          900: '#2B1542'
        },
        grey: {
          DEFAULT: '#6B7280', // Main Grey
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        },
        text: {
          DEFAULT: '#1A1A1A', // Main Text Black
          light: '#4B5563',
          dark: '#000000'
        },
        accent: {
          yellow: '#F5C842',    // MnA Yellow
          orange: '#F5A742',    // Mna Orange
          'yellow-light': '#FEF3C7',
          'orange-light': '#FED7AA'
        }
      }
    },
  },
  plugins: [],
}