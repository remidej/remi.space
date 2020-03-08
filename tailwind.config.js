const { colors, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          600: '#77879e',
        },
        blog: colors.teal,
        work: colors.blue,
        projects: colors.indigo,
        twitter: colors.blue,
      },
      fontFamily: {
        ...fontFamily,
        sans: ['Inter UI', fontFamily.sans],
      },
    },
    container: {
      center: true,
    },
  },
  variants: [
    'responsive',
    'group-hover',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'disabled',
  ],
  plugins: [],
}
