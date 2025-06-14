/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // App Router (Next.js 13+)
    './src/pages/**/*.{js,ts,jsx,tsx}', // Pages directory
    './src/components/**/*.{js,ts,jsx,tsx}', // Any component directories
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
