/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050505',
        'background-alt': '#0a0a0a',
        surface: '#111111',
        'surface-border': 'rgba(255, 107, 0, 0.18)',
        'surface-hover': 'rgba(255, 107, 0, 0.08)',
        primary: {
          DEFAULT: '#FF6B00', // Primary Accent
          hover: '#e05e00',
          light: '#FF9D42',
          glow: 'rgba(255, 107, 0, 0.4)',
        },
        glow: {
          DEFAULT: '#FF9D42', // Glow Accent
          light: '#FFD166',
        },
        highlight: {
          DEFAULT: '#FFD166', // Highlight
        },
        main: '#F5F5F0', // Main Text
        secondary: '#A3A3A3', // Secondary Text
        card: '#111111', // Card background
      },
      fontFamily: {
        heading: ['Outfit', 'Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'orange-glow': '0 0 25px -5px rgba(255, 107, 0, 0.45)',
        'orange-glow-lg': '0 0 45px -5px rgba(255, 107, 0, 0.55)',
      },
    },
  },
  plugins: [],
}
