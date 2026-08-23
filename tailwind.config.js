/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT: '#1B1917', 800: '#28241F' },
        navy:   { DEFAULT: '#3D3833', 400: '#65605A' },
        orange: { DEFAULT: '#B2532E', 600: '#8B3F22', 400: '#C97A52' },
        paper:  { DEFAULT: '#F7F5F1', 200: '#EEEAE3' },
        line:   '#DEDAD2',
        state:  { ok: '#127A56', wait: '#7A5C12', stop: '#A32E2E' },
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
