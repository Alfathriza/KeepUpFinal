/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      phone: "576px",
      // => @media (min-width: 576px) { ... }

      tablet: "960px",
      // => @media (min-width: 960px) { ... }

      desktop: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};
