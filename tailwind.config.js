/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ground: '#efe9dd',
        surface: '#e7ddcb',
        ink: '#2c2824',
        'ink-soft': '#4a443c',
        'ink-muted': '#6b6358',
        'on-accent': '#f3eee4',
        accent: '#7d3c3c',
        'accent-strong': '#65302f',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
