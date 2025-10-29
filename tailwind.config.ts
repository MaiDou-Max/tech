import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
      fontFamily: {
        longCang: ['var(--font-google-long-cang)'],
        sans: ['var(--font-google-sans)'],
        serif: ['var(--font-google-serif)'],
        handwriting: ['var(--font-google-handwriting)'],
        pacifico: ['var(--font-google-pacifico)'],
        dancing: ['var(--font-google-dancing)'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        hoverCard: '0 12px 32px rgba(59, 130, 246, 0.15)',
        blue: '0 8px 24px rgba(59, 130, 246, 0.25)',
        pink: '0 8px 24px rgba(244, 114, 182, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--color-text)',
            a: {
              color: 'var(--color-primary)',
              '&:hover': {
                color: 'var(--color-primary-light)',
              },
            },
            'h1, h2, h3, h4': {
              color: 'var(--color-text)',
            },
            code: {
              color: 'var(--code-inline-color)',
              backgroundColor: 'var(--code-inline-bg)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'var(--code-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
            },
            blockquote: {
              borderLeftColor: 'var(--color-primary)',
              color: 'var(--color-text-muted)',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
