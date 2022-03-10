const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        un: ['MapoFlowerIsland'],
      },
      scale: {
        118: '1.18',
      },
      colors: {
        gradation: `rgba(243,255,244,0.1)
                    linear-gradient(180deg, rgba(243,255,244,0.1) 0%, rgba(255,249,246,0.7) 50%, rgba(255,238,246,1) 100%)`,
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(80px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-img': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-down': 'fade-out-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'fade-in-up-two': 'fade-in-up 0.5s  ease-out',
        'fade-in-up-three': 'fade-in-up 1.3s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
          },
        },
        '.scroll-style': {
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            height: `5%`,
            background: `#003300`,
            borderRadius: '30px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#e8f5e9',
            // borderRadius: '30%',
          },
        },
        '.x-scroll-style': {
          '&::-webkit-scrollbar': {
            width: '2px',
          },
          '&::-webkit-scrollbar-thumb': {
            height: `2%`,
            background: `#005005`,
            borderRadius: '30px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            borderRadius: '30%',
          },
        },
      });
    }),
  ],
};
