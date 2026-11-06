import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          base: "#light",
          primary: "#C9A227",
          background: "#FAF6EC",
          secondaryBackground: "#F2EADA",
          text: "#241C17",
        }
      },
      fontFamily: {
        sans: ['sans-serif'],
        quran: ['Traditional Arabic', 'Scheherazade', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
