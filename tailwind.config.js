/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'cream-paper': '#111010',
        'botanical-ink': '#f0ebe2',
        'bark-brown': '#9a8f82',
        'warm-loam': '#d4a853',
        'forest-floor': '#b8892e',
        'sage-mist': '#1c1b1a',
        lichen: '#2a2825',
        'moss-veil': '#332f28',
        eucalyptus: '#4a4540',
      },
      fontFamily: {
        primary: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '1200px' },
    },
  },
  plugins: [],
}
