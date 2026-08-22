/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT: '#0B0B1F', 800: '#14143A' },
        navy:   { DEFAULT: '#1B1B4B', 400: '#4A4E6E' },
        orange: { DEFAULT: '#E8541E', 600: '#B23F0F', 400: '#FF7A45' },
        paper:  { DEFAULT: '#F5F4F0', 200: '#EDECE6' },
        line:   '#DCDBD3',
        state:  { ok: '#0E7A55', wait: '#9A5B08', stop: '#B4232E' },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['var(--font-archivo)', 'Archivo', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'h1': ['clamp(2.2rem, 5vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['clamp(1.6rem, 3vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1.0625rem', { lineHeight: '1.65', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0.06em' }],
      },
    },
  },
  plugins: [],
};
