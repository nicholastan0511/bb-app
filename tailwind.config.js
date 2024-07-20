/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
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
