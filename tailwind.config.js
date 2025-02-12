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
        'retro': {
          orange: '#D35400',  // burnt orange
          yellow: '#F39C12',  // mustard yellow
          olive: '#707B4C',   // olive
          brown: '#8B4513',   // saddle brown
          cream: '#F5E6D3',   // warm cream
          neon: '#FFE162'     // subtle neon accent
        },
        primary: {
          300: '#F39C12',
          400: '#D35400',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'retro-gradient': 'linear-gradient(to bottom right, #D35400, #F39C12)',
      },
    },
  },
  plugins: [],
}
