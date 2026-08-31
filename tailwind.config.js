/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F0',
        cream: '#F1E7D6',
        beige: '#E4D2AF',
        champagne: '#CBA25F',
        charcoal: '#191410',
        'charcoal-soft': '#2A231C',
        brown: '#4A2F1F',
        rose: '#A15064',
        'rose-dark': '#7E3B4C',
        gold: '#B4874A',
        'gold-light': '#D8B87C',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        soft: '0 20px 60px -16px rgba(25, 20, 16, 0.35)',
        card: '0 14px 40px -14px rgba(25, 20, 16, 0.22)',
        'card-hover': '0 22px 50px -14px rgba(25, 20, 16, 0.32)',
        gold: '0 1px 0 0 rgba(180, 135, 74, 0.4)',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
