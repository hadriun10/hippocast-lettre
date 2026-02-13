/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': '#F5F3FF',
        'bg-form': '#fffbf5',
        'tab-active': '#fffbf5',
        'tab-completed': '#f5ede0',
        'violet': {
          DEFAULT: '#8B5CF6',
          light: '#C4B5FD',
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
