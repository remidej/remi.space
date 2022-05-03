const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: colors.white,
        neutral: colors.slate,
        primary: colors.teal,
        blog: colors.teal,
        work: colors.blue,
      },
      fontFamily: {
        ...defaultTheme.fontFamily,
        sans: [`Inter UI`, defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: `100%`,
          marginLeft: `auto`,
          marginRight: `auto`,
          paddingLeft: `1rem`,
          paddingRight: `1rem`,
          "@screen sm": {
            maxWidth: `600px`,
          },
          "@screen md": {
            maxWidth: `700px`,
          },
          "@screen lg": {
            maxWidth: `720px`,
          },
          "@screen xl": {
            maxWidth: `720px`,
          },
        },
      });
    },
  ],
};
