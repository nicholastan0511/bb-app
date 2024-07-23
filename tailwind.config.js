/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 3px 5px rgba(255, 255, 255, 0.5)',
      },
      gridTemplateColumns: {
        stat: 'repeat(auto-fit, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
  daisyui: {
    themes: [
      // 'fantasy',
      {
        mytheme: {
          primary: '#0065ff',
          secondary: '#008100',
          accent: '#0047ff',
          neutral: '#1f1b03',
          'base-100': '#2d2728',
          info: '#0073ff',
          success: '#00a600',
          warning: '#f66f00',
          error: '#c02446',
        },
      },
    ],
  },
};
