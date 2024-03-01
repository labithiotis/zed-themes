/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('tailwind-scrollbar-hide')],
  theme: {
    extend: {
      colors: {
        zed: {
          50: '#edf8ff',
          100: '#d6edff',
          200: '#b5e2ff',
          300: '#83d1ff',
          400: '#48b7ff',
          500: '#1e93ff',
          600: '#0673ff',
          700: '#005af5',
          800: '#084ccf',
          900: '#0d419b',
          950: '#0e285d',
        },
      },
    },
  },
};
