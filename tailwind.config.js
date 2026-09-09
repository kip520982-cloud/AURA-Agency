/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pohutukawa Orange — brand primary
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFF4EF',
          100: '#FFE4D8',
          200: '#FFC6AE',
          300: '#FFA37D',
          400: '#FF8656',
          500: '#FF6B35',
          600: '#ED5218',
          700: '#C43D0D',
          800: '#9B3110',
          900: '#7C2A11',
        },
        // Tasman Sea Blue — brand secondary
        secondary: {
          DEFAULT: '#2C3E50',
          50: '#F5F7F9',
          100: '#E8EDF1',
          200: '#CDD7DF',
          300: '#A6B5C2',
          400: '#74889A',
          500: '#4E6579',
          600: '#3A4F62',
          700: '#2C3E50',
          800: '#22303E',
          900: '#17212B',
          950: '#0E161D',
        },
        // NZ Green — brand accent
        accent: {
          DEFAULT: '#27AE60',
          50: '#EAF9F0',
          100: '#D0F1DE',
          200: '#A3E3BF',
          300: '#6FCF9B',
          400: '#43BC7C',
          500: '#27AE60',
          600: '#1E8C4D',
          700: '#1A6F3F',
          800: '#175833',
          900: '#12452A',
        },
        // Cloud White — full scale so bg-neutral-50 / border-neutral-200 resolve
        neutral: {
          DEFAULT: '#ECF0F1',
          50: '#F7F9FA',
          100: '#ECF0F1',
          200: '#DDE3E7',
          300: '#C6CFD5',
          400: '#9AA7B0',
          500: '#75838D',
          600: '#5A6771',
          700: '#46515A',
          800: '#333C43',
          900: '#23292E',
        },
        // Semantic text tokens — all AA-compliant on white at small sizes
        ink: {
          DEFAULT: '#22303E',
          body: '#47596B',
          muted: '#64788A',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.25rem', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'display-lg': ['4.25rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        '4xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 32, 44, 0.04), 0 4px 12px rgba(16, 32, 44, 0.05)',
        card: '0 1px 3px rgba(16, 32, 44, 0.05), 0 8px 24px -6px rgba(16, 32, 44, 0.10)',
        lift: '0 2px 6px rgba(16, 32, 44, 0.06), 0 18px 40px -12px rgba(16, 32, 44, 0.18)',
        glow: '0 10px 30px -10px rgba(255, 107, 53, 0.45)',
        'inner-hairline': 'inset 0 0 0 1px rgba(16, 32, 44, 0.06)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(44,62,80,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,62,80,0.05) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(60% 55% at 18% 0%, rgba(255,107,53,0.16) 0%, transparent 60%), radial-gradient(55% 50% at 85% 12%, rgba(39,174,96,0.14) 0%, transparent 60%)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'shine-sweep': 'shineSweep 2.6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shineSweep: {
          '0%': { transform: 'translateX(-120%)' },
          '60%, 100%': { transform: 'translateX(220%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
