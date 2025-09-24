/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx,html}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        work: ['"Work Sans"', 'monospace'], 
      },
    },
  },
  plugins: [],
}