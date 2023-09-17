/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/homepage/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'HTN-primary-colour': '#ed3507'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fadeout': 'fadeout 3000ms ease-in-out;',
      }
    },
    keyframes: {
      // Fade-out keyframes
      'fadeout': {
        '0%': {
          opacity: 1,
        },
        '100%': {
          opacity: 0,
          display: 'none', // Hide the element after fading out
        },
      },
    },
  },
  plugins: [],
}
