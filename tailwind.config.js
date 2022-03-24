module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'skyblue': '#1CB0FD',
        'darkbrown': '#434343',
        'darkerbrown': '#2F2F2F',
        'whiteOpacity': 'rgb(255 255 255 / 35%)',
        'blueklein' : '#1B00C6',
      }),
      backgroundImage: theme => ({
        'famous': "url('/src/images/graffitibg.png')",
        'party': "url('/src/images/thefamouskv.png')",
      }),
      textColor: theme => ({
        ...theme('colors'),
        'c-darkgray': '#1F1F1F',
        'c-blue': '#1214b9',

      }),
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        Orbitron: ['Orbitron', 'Orbitron']
      },
      animation: {
        spin: "spin 1s linear infinite",
        pulse: "pulse 2s linear infinite",
        ping: "ping 2s linear infinite",
        bounce: "bounce 1s linear infinite",
      },
      fontSize: {
        xxs: '0.5rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '2.50rem',
        '6xl': '30rem',
        '7xl': '5.25rem',
        '8xl': '6rem',
        '9xl': '7rem',
        '10xl': '10rem',
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '0.0625em',
        widest: '0.075em',
      },
      padding: {
        '97': '28rem',
        '100': '42rem'
      },
      width: {
        '2xlHomeLogo': '45rem',
        'lgHomeLogo': '35rem',
        'ten': '22%'
      },
      height: {
        '81': '21rem',
        '82': '22rem',
        lg: '32rem',
        '2lg': '33rem',
        xl: '35rem',
        xxl: '48rem',
      },
      minHeight: {
        screenFooter: '85vh',
        loader: '16rem',
      },
      maxHeight: {
        '100': '31rem',
        '101': '45rem'
      },
      minWidth: {
        '3/4': '90%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}