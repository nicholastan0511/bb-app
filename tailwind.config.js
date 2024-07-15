/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#da00ff",         
          "secondary": "#0083f5",         
          "accent": "#be0000",          
          "neutral": "#0b0b0b",          
          "base-100": "#2a1f2d",          
          "info": "#009fe6",            
          "success": "#5bbf00",                 
          "warning": "#ffc200",              
          "error": "#ed314f",
        },
      },
    ],
  },
}

