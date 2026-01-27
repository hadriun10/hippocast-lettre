/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': '#FDF8F3',
        'bg-form': '#FDF8F3',
        'tab-active': '#E8DFD4',
        'tab-completed': '#D4C9BC',
        'violet': {
          DEFAULT: '#8B5CF6',
          light: '#DDD6FE',
          dark: '#7C3AED',
        },
        'border': '#1F2937',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'input': '8px',
        'block': '12px',
        'modal': '16px',
      },
      boxShadow: {
        'modal': '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
