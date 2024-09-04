/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        skin: {
          base: 'var(--bg-color)',
        },
      },
      textColor: {
        skin: {
          base: 'var(--text-color)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],
}
