/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#1E3A1E',
        'forest-deep': '#1E3A1E',
        'leaf-mid': '#3B5E3A',
        forest: '#3B5E3A',
        'midnight-herb': '#0D1F0D',
        
        parchment: '#F5ECD7',
        'cream-white': '#FAF6EE',
        'sand-brown': '#C8A97E',
        
        'turmeric-gold': '#E9A84C',
        turmeric: '#E9A84C',
        'saffron-fire': '#C4622D',
        saffron: '#C4622D',
        'copper-rust': '#B87333',
        'gold-shimmer': '#D4AF37',
        
        charcoal: '#1C1C1C',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        title: ['"Cinzel"', 'serif'],
        subheading: ['"DM Serif Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        caption: ['"Jost"', 'sans-serif'],
        sanskrit: ['"Tiro Devanagari Sanskrit"', 'serif'],
        accent: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'leaf': '0 4px 24px rgba(30, 58, 30, 0.15)',
        'earth': '0 8px 32px rgba(200, 169, 126, 0.2)',
        'deep': '0 24px 80px rgba(13, 31, 13, 0.4)',
        'glow': '0 0 40px rgba(233, 168, 76, 0.4)',
        'ancient': '0 10px 30px rgba(139, 94, 60, 0.15)',
        'ancient-dark': 'inset 0 0 20px rgba(233, 168, 76, 0.05), 0 10px 30px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
