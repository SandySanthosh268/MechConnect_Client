/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af', // Blue 800
          light: '#3b82f6',   // Blue 500
          dark: '#1e3a8a',    // Blue 900
        },
        secondary: {
          DEFAULT: '#f59e0b', // Amber 500
          light: '#fbbf24',   // Amber 400
          dark: '#d97706',    // Amber 600
        },
        background: {
          DEFAULT: '#f8fafc', // Slate 50
          dark: '#0f172a',    // Slate 900
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
