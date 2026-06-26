/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0C0C10',
        indigo: '#5B4EFE',
        lime: '#C8FF3E',
        coral: '#F56B4A',
        purple: '#8579A5',
        text: '#EEEEF2',
        muted: '#8A8A9E',
        'muted-soft': '#6B6B7E',
        surface: '#13131A',
        vault: '#0A0A0F',
        footer: '#080810',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      maxWidth: {
        shell: '1400px',
      },
      spacing: {
        // 8-point rhythm aliases
        '2xs': '8px',
        xs: '16px',
        sm2: '24px',
        md2: '32px',
        lg2: '48px',
        xl2: '64px',
        '2xl2': '96px',
        '3xl2': '128px',
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 0.5rem + 8.4vw, 6.875rem)', { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['clamp(2.25rem, 1rem + 4.2vw, 4rem)', { lineHeight: '0.95', letterSpacing: '-0.015em', fontWeight: '600' }],
      },
      animation: {
        ticker: 'ticker 35s linear infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out 1s infinite',
        'float-fast': 'float 5s ease-in-out 2s infinite',
        shimmer: 'shimmer 1.2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate, 0deg))' },
          '50%': { transform: 'translateY(-12px) rotate(var(--tw-rotate, 0deg))' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
