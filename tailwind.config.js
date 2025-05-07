/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          900: '#0F172A', // Background
          800: '#1E293B', // Card background
          700: '#334155', // Input background
          600: '#475569', // Border
          500: '#64748B', // Secondary text
          400: '#94A3B8', // Muted text
          300: '#CBD5E1', // Light text
          200: '#E2E8F0', // Divider
          100: '#F1F5F9', // Light background
          50: '#F8FAFC', // Hover background
        },
        blue: {
          600: '#3B82F6', // Primary
          500: '#60A5FA', // Lighter primary
          400: '#93C5FD', // Even lighter primary
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};