const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        blog: colors.teal,
        work: colors.purple,
        projects: colors.indigo,
        twitter: colors.blue,
      },
    },
  },
  variants: {},
  plugins: [],
}
