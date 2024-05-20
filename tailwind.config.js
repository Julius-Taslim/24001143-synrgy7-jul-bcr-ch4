/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'display': ['Helvetica'],
    },
    extend: {
      listStyleImage: {
        checkmark: 'url("/public/images/Group 53 (3).png")',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}