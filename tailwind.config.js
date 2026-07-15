/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct Brand Identity Colors
        'digital-twilight': '#1D0B3B',
        'safety-orange': '#F25C05',
        'oatmeal-white': '#F8F6F0',
        'emerald-success': '#059669',
        'sand-gold': '#D97706',
        'crimson-error': '#DC2626',
        'slate-gray': '#475569',

        // Semantic Brand Aliases
        brand: {
          bg: '#1D0B3B',        // Digital Twilight
          accent: '#F25C05',    // Safety Orange
          surface: '#F8F6F0',   // Oatmeal White
          success: '#059669',   // Emerald
          warning: '#D97706',   // Sand Gold
          error: '#DC2626',     // Crimson
          secondary: '#475569', // Slate Gray
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],      // 56px
        'h2': ['2.5rem', { lineHeight: '1.3', fontWeight: '700' }],      // 40px
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],      // 24px
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],      // 16px
        'caption': ['0.75rem', { lineHeight: '1.6', fontWeight: '400' }], // 12px
      },
    },
  },
  plugins: [],
};
