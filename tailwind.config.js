/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "space": {
          950: "#050819",
          900: "#0a0e27",
          800: "#121838",
          700: "#1a2348",
          600: "#252f5a",
        },
        "category": {
          "alkali-metal": "#ff6b6b",
          "alkaline-earth": "#ffa94d",
          "transition-metal": "#ffd43b",
          "post-transition": "#69db7c",
          "metalloid": "#38d9a9",
          "nonmetal": "#4dabf7",
          "halogen": "#748ffc",
          "noble-gas": "#da77f2",
          "lanthanide": "#f783ac",
          "actinide": "#e599f7",
        },
      },
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '250': '250ms',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 12s linear infinite',
        'spin-slow-reverse': 'spin 10s linear infinite reverse',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(77, 171, 247, 0.4)',
        'glow-lg': '0 0 40px rgba(77, 171, 247, 0.5)',
      },
    },
  },
  plugins: [],
};
