/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: false,
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
      },
    },
  },
  // theme: {
  //   extend: {
  //     colors: {
  //       gray: {
  //         lightest: '#fafafa',
  //         lighter: '#f5f5f5',
  //         light: '#e4e4e4',
  //         default: '#ccc',
  //         dark: '#999',
  //         darker: '#666',
  //         darkest: '#333',
  //       },
  //       red: {
  //         lighter: '#ffe1e1',
  //         light: '#ffa5a5',
  //         default: '#ff6a6a',
  //       },
  //       orange: {
  //         lighter: '#ffe3cb',
  //         light: '#ffbf8a',
  //         default: '#eb8f43',
  //       },
  //       yellow: {
  //         lighter: '#ffedbb',
  //         light: '#ffdc7b',
  //         default: '#ffcc3f',
  //       },
  //       green: {
  //         lighter: '#d8ffec',
  //         light: '#8be0b6',
  //         default: '#4ec189',
  //       },
  //       blue: {
  //         lighter: '#e2ecff',
  //         light: '#9cbaf2',
  //         default: '#477de9',
  //       },
  //       purple: {
  //         lighter: '#ebdfff',
  //         light: '#be94ff',
  //         default: '#8e45ff',
  //       },
  //     },
  //     fill: theme => theme('colors'),
  //   },
  // },
  variants: {
    margin: ['responsive', 'first', 'last'],
  },
}
