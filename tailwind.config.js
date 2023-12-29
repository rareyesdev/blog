// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-inter)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.violet,
        gray: colors.gray,
        // used for the background of the scroll button with .2 opacity
        'transparent-gray': '	#888888',
        'dark-background': '#050505',
        'light-foreground': {
          DEFAULT: '#555',
          deep: '#222',
          deeper: '#000',
        },
        'dark-foreground': {
          DEFAULT: '#bbb',
          deep: '#ddd',
          deeper: '#fff',
        },
      },
      // @ts-expect-error TODO find a way to define this type
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.light-foreground.DEFAULT'),
            a: {
              textDecoration: 'none',
              borderBottom: '1px solid #7d7d7d4d',
              transition: 'border-bottom .3s ease-in-out',
              '&:hover': {
                borderBottom: `1px solid ${theme('colors.light-foreground.DEFAULT')}`,
              },
            },
            code: {
              color: theme('colors.light-foreground.deep'),
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.dark-foreground.DEFAULT'),
            '--tw-prose-pre-bg': '#0e0e0e',
            a: {
              '&:hover': {
                borderBottom: `1px solid ${theme('colors.dark-foreground.DEFAULT')}`,
              },
            },
            code: {
              color: theme('colors.dark-foreground.deep'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
