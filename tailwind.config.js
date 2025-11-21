import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		screens: {
  			xs: '480px',
                ...defaultTheme.screens,
  			'2xl': '1440px'
  		},
  		colors: {
  			brand: {
  				'50': '#F5F6F7',
  				'100': '#EDEFF1',
  				'200': '#D8DADE',
  				'500': '#1D1F23',
  				'700': '#0C0E12',
  				'900': '#010205',
  				'950': '#020609'
  			},
  			accent: {
  				green: '#99CF62',
  				lime: '#98E948',
  				blue: '#45A6DD',
  				orange: '#EA5F38',
  				purple: '#6A26F1',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			gray: {
  				'50': '#F9FAFB',
  				'100': '#F3F3F3',
  				'300': '#D5D7DA',
  				'400': '#B1B5BA',
  				'500': '#878C91',
  				'700': '#3E4248'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Plus Jakarta Sans',
                    ...defaultTheme.fontFamily.sans
                ],
  			heading: [
  				'Plus Jakarta Sans',
                    ...defaultTheme.fontFamily.sans
                ],
  			display: [
  				'Manrope',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		spacing: {
  			'section-y': '5rem',
  			'section-y-lg': '6.5rem',
  			gutter: '1.5rem',
  			'gutter-lg': '2.5rem'
  		},
  		borderRadius: {
  			pill: '999px',
  			layout: '30px',
  			panel: '20px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'panel-soft': '0 32px 60px -30px rgba(1, 2, 5, 0.35)'
  		},
  		dropShadow: {
  			glow: '0 20px 45px rgba(153, 207, 98, 0.35)'
  		},
  		transitionTimingFunction: {
  			'soft-spring': 'cubic-bezier(0.16, 1, 0.3, 1)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
