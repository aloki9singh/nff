/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
      },
      colors: {
        blu: '#1E1E1E',
        pink: '#E1348B',

        // black:'#3C3939',
        // signupForm:'rgba(255, 255, 255, 0.02)',
        // orBorder:'rgba(255, 255, 255, 0.32)'

        bs: '#0D0E14',
        primary: '#E1348B',

      },
      backgroundImage: {
        mentor:
          'linear-gradient(103.67deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 100%)',
      },
      screens: {
        'sd': '300px',

      },
      borderRadius: {
        "10": "10px",
      },
      letterSpacing: {
        thight2: '-2px',
      },
    },

    fontFamily: {
      ral: ['Raleway', 'sans-serif'],
      raleway: ['Raleway', 'sans-serif'],
      Inter: ['Inter', 'sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
