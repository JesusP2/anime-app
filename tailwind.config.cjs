const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        coolblue: "#0ea5e9",
      },
    },
  },
  plugins: [],
};