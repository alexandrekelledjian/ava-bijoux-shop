import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette AVA - Charte graphique
        ava: {
          cream: '#FDFFEB',      // Fond principal
          gold: '#FFEEC2',       // Accents, boutons secondaires
          peach: '#FFD7A1',      // Éléments d'accentuation
          coral: '#FFBB90',      // Call-to-action, boutons principaux
          anthracite: '#454545', // Textes, éléments sombres
        }
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      fontSize: {
        // Titres - Raleway 36-48pt
        'title-lg': ['3rem', { lineHeight: '1.2', fontWeight: '600' }],
        'title': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        // Sous-titres - Lato 24-30pt
        'subtitle-lg': ['1.875rem', { lineHeight: '1.3', fontWeight: '400' }],
        'subtitle': ['1.5rem', { lineHeight: '1.3', fontWeight: '400' }],
        // Corps - Quicksand 12-14pt
        'body-lg': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['0.75rem', { lineHeight: '1.6', fontWeight: '400' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ava-pattern': "url('/images/ava-pattern.svg')",
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
