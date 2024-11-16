/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '3': 'repeat(3, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
  safelist: [
    'grid-cols-3',
    'gap-6',
  ],
}
