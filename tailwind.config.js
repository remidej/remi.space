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
        neutral: colors.slate,
        blog: colors.teal,
        work: colors.blue,
        projects: colors.indigo,
        twitter: colors.blue,
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
