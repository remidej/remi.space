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
  corePlugins: {
    container: false,
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': {
            maxWidth: '600px',
          },
          '@screen md': {
            maxWidth: '700px',
          },
          '@screen lg': {
            maxWidth: '720px',
          },
          '@screen xl': {
            maxWidth: '720px',
          },
        },
      })
    },
  ],
}
