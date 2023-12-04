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
        'primary': '#16a085',
        'secondary': '#77A8D5',
        'success': '#1abc9c',
        'info': '#3498db',
        'warning': '#F1C40F',
        'error': '#E74C3C',

        'dark': '#202124',
        'subdued': '#F5F5F5',
        'content': '#F9FAFB',
        'grey': '#f0f0f0',
        'default': '#FAFAFC',

        // FLAT UI PALETTE
        'turquoise': '#1abc9c',
        'green-sea': '#16a085',
        
        'emerald': '#2ecc71',
        'nephritis': '#27ae60',

        'peter-river': '#3498db',
        'belize-hole': '#2980b9',

        'amethyst': '#9b59b6',
        'wisteria': '#8e44ad',

        'wet-asphalt': '#34495e',
        'midnight-blue': '#2c3e50',

        'sun-flower': '#f1c40f',
        'orange': '#f39c12',

        'carrot': '#e67e22',
        'pumpkin': '#d35400',

        'alizarin': '#e74c3c',
        'pomegranate': '#c0392b',

        'clouds': '#ecf0f1',
        'silver': '#bdc3c7',

        'concrete': '#95a5a6',
        'asbestos': '#7f8c8d',

        // APPLE COLORS
        'apple-gray': '#8E8E93',
        'apple-gray-2': '#AEAEB2',
        'apple-gray-3': '#C7C7CC',
        'apple-gray-4': '#D1D1D6',
        'apple-gray-5': '#E5E5EA',
        'apple-gray-6': '#F2F2F7',
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
