/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  safelist: [
    'bg-blue-500/20',
    'bg-purple-500/20',
    'bg-green-500/20',
    'bg-orange-500/20',
    'text-blue-300',
    'text-purple-300',
    'text-green-300',
    'text-orange-300',
    {
      pattern: /bg-(blue|purple|green|orange|yellow|teal|cyan|indigo|pink)-(500|300|400)/,
      variants: ['hover', 'focus', 'group-hover'],
    },
    {
      pattern: /text-(blue|purple|green|orange|yellow|teal|cyan|indigo|pink)-(500|300|400)/,
      variants: ['hover', 'focus', 'group-hover'],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
} 