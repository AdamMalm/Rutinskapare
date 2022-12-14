/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      'xs': ['14px', {
        lineHeight: '18px',
        letterSpacing: '-0.01px',
      }],
      'sm': ['18px', {
        lineHeight: '22px',
        letterSpacing: '0.5px',
      }],
      'base': ['18px', {
        lineHeight: '22px',
        letterSpacing: '-0.01px',
      }],
      'lg': ['24px', {
        lineHeight: '28px',
        letterSpacing: '-0.01px',
      }],
      'xl': ['34px', {
        lineHeight: '38px',
        letterSpacing: '-0.01px',
      }],
    },
    extend: {
      colors: {
        'primary100': '#144E5A',
        'primary80': '#007274',
        'primary60': '#2AA3BC',
        'orange': '#FB9039',
        'black': '#1C2520',
        'white': '#fff',
        'gray': '#C4C4C4',
        'lightgray': '#F9F9F9'
      },
    },
  },
  plugins: [],
}
