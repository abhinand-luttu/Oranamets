/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F7F2E9',
          200: '#EFE6D5',
          300: '#E4D5BE',
          400: '#D5BEA0',
        },
        gold: {
          light: '#E6C987',
          DEFAULT: '#C5A059',
          rich: '#D4AF37',
          dark: '#9E7D3B',
          deep: '#755922',
        },
        maroon: {
          light: '#8C2B41',
          DEFAULT: '#6B1D2F',
          dark: '#4E1321',
          deep: '#360C16',
        },
        brown: {
          light: '#4A2E20',
          DEFAULT: '#2C1810',
          dark: '#1A0D08',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(107, 29, 47, 0.15)',
        'royal-gold': '0 10px 25px -5px rgba(197, 160, 89, 0.25)',
        'royal-card': '0 4px 20px rgba(44, 24, 16, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'royal-pattern': "radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.08) 0%, transparent 60%)",
      }
    },
  },
  plugins: [],
}
