/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbf3',
          100: '#d5f5e1',
          200: '#aeebc9',
          300: '#78daa9',
          400: '#3fc086',
          500: '#1aa56c',
          600: '#0f8757',
          700: '#0d6c48',
          800: '#0e563c',
          900: '#0c4733',
          950: '#04281c',
        },
        accent: {
          400: '#ffb020',
          500: '#f59e0b',
          600: '#d97a06',
        },
        surface: {
          DEFAULT: '#0a0f0d',
          50: '#f6f8f7',
          100: '#141a18',
          200: '#1a2220',
          300: '#212b28',
          400: '#2b3733',
          800: '#0e1412',
          900: '#0a0f0d',
          950: '#050807',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse at top, rgba(26,165,108,0.18), transparent 60%)',
        'hero-glow': 'radial-gradient(60% 60% at 50% 0%, rgba(26,165,108,0.25) 0%, rgba(10,15,13,0) 70%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(63,192,134,0.15), 0 8px 30px -8px rgba(26,165,108,0.35)',
        card: '0 4px 24px -4px rgba(0,0,0,0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
