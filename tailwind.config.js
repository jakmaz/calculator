const { createThemes } = require('tw-colors');
const withMT = require("@material-tailwind/html/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      dark: {
        'screenPrimary': '#22252D',
        'screenSecondary': '#292D36',
        'buttons': '#262a33',
        'numbers': '#FFFFFF',
        'mathOperationsRight': '#bb5356',
        'mathOperationsTop': '#25ECC9'
      },
      light: {
        'screenPrimary': '#FFFFFF',
        'screenSecondary': '#f6f6f6',
        'buttons': '#fcfcfc',
        'numbers': '#000000',
        'mathOperationsRight': '#d54042',
        'mathOperationsTop': '#25ECC9'
      },
    }, {
      defaultTheme:'light'
    })
  ]
});