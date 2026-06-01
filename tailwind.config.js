/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quest-bg': '#0f0f1a',
        'quest-surface': '#1a1a2e',
        'quest-primary': '#7c3aed',
        'quest-secondary': '#6366f1',
        'quest-text': '#e2e8f0',
        'quest-muted': '#94a3b8',
        'quest-success': '#22c55e',
        'quest-warning': '#f59e0b',
        'quest-danger': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
