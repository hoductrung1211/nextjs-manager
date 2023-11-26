import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      width: {
        '68': '17rem',
        '76': '19rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '140': '35rem',
        '160': '40rem',
        '180': '45rem',
        '200': '50rem',
        '220': '55rem',
        '240': '60rem',
        '260': '65rem',
        '280': '70rem',
      },
      height: {
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '140': '35rem',
        '160': '40rem',
        '180': '45rem',
        '200': '50rem',
        '220': '55rem',
        '240': '60rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark': '#424245',
        'dark-light': '#6E6E73',
        'concrete': '#95A5A6', 
        'grey': '#f0f0f0',
        'default': '#FAFAFC',
        "green-sea": "#16a085",
        "nephritis": "#27ae60",
        "belize-hole": "#2980b9",
        "wisteria": "#8e44ad",
        "midnight-blue": "#2c3e50",
        "orange": "#f39c12",
        "pumpkin": "#d35400",
        "pomegranate": "#c0392b",
        "asbestos": "#7f8c8d",
        "wet-asphalt": "#34495e"
      },
      backdropBlur: {
        'xs': '2px'
      },
      lineHeight: {
        '14': '3.5rem'
      },
      keyframes: {
        'fade-in': {
          '0%': {
            'opacity': '0.4'
          },
          '100%': {
            'opacity': '1'
          }
        },
        'zoom-in': {
          '0%': {
            // 'background-color': '#7f8c8d'
            'transform': 'scale(0.8) translateY(-10%)', 
          },
          '100%': {
            // 'background-color': '#00000099'
            'transform': 'scale(1) translateY(0)', 
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 100ms ease-in-out forwards',
        'zoom-in': 'zoom-in 200ms ease-out forwards'
      }
    },
  },
  plugins: [],
}
export default config
