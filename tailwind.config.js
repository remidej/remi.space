const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        blog: colors.purple,
        work: colors.teal,
        projects: colors.indigo,
        twitter: colors.blue,
      },
    },
  },
  variants: {},
  plugins: [],
}
