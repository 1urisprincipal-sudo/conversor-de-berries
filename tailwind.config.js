/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pirata': ['"Pirata One"', 'cursive'],
      },
      backgroundImage: {
        'parchment': "linear-gradient(145deg, #2d1b0e 0%, #1a0f07 100%)",
        'wanted-glow': "radial-gradient(circle at 20% 20%, #ffd70020, transparent 70%)",
      },
      boxShadow: {
        'wanted': '0 0 20px #00000080, inset 0 0 10px #d4af37',
      }
    },
  },
  plugins: [],
}