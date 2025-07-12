/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/spark-ui/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        mocha: {
          base: '#1e1e2e',
          surface: '#313244',
          overlay: '#6c7086',
          text: '#cdd6f4',
          subtext: '#a6adc8',
          pink: '#f5c2e7',
          mauve: '#cba6f7',
          red: '#f38ba8',
          maroon: '#eba0ac',
          peach: '#fab387',
          yellow: '#f9e2af',
          green: '#a6e3a1',
          teal: '#94e2d5',
          blue: '#89b4fa',
          lavender: '#b4befe'
        },
        'pastel-orange': '#fab387',
        'pastel-blue': '#89b4fa',
      },
    },
  },
  plugins: [],
}
