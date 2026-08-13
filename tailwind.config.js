/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Maroon / Burgundy Palette
        maroon: {
          50: '#FBF5F6',
          100: '#F7E7E9',
          200: '#EFCFD4',
          300: '#E1A8B2',
          400: '#CF7587',
          500: '#BA4B62',
          600: '#9E3249',
          700: '#7E1F32', // Core Rich Maroon
          800: '#5F1424', // Deep Burgundy
          900: '#430B17', // Dark Royal Maroon
          950: '#28060D', // Deepest Luxury Burgundy
        },
        // Warm Brown / Mocha Palette
        warmbrown: {
          50: '#FAF6F3',
          100: '#F4EAE3',
          200: '#E8D4C7',
          300: '#D7B7A3',
          400: '#C2947A',
          500: '#AB7559',
          600: '#925B42',
          700: '#734430',
          800: '#553123',
          900: '#3A2016',
          950: '#22120C',
        },
        // Cream & Off-White Backgrounds
        cream: {
          50: '#FDFBF7',  // Clean luxury off-white
          100: '#FAF6ED', // Warm soft cream
          200: '#F2EBDB',
          300: '#E7DCBF',
          400: '#D7C79D',
          500: '#C2AF7A',
        },
        // Subtle Gold Accents
        gold: {
          200: '#FEF3C7',
          300: '#FDE68A',
          400: '#F4CE52',
          500: '#D4AF37', // Refined Metallic Gold
          600: '#B89225',
          700: '#947218',
        },
        charcoal: {
          700: '#3D3430',
          800: '#2B2320',
          900: '#1C1614',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
          hover: '#20BA5A',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 20px 32px -10px rgba(67, 11, 23, 0.12), 0 10px 16px -5px rgba(34, 18, 12, 0.04)',
        'maroon-glow': '0 10px 25px -5px rgba(126, 31, 50, 0.45)',
        'warmbrown-glow': '0 10px 25px -5px rgba(85, 49, 35, 0.4)',
        'gold-glow': '0 10px 25px -5px rgba(212, 175, 55, 0.35)',
        'whatsapp-glow': '0 10px 25px -5px rgba(37, 211, 102, 0.4)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite 1s',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
