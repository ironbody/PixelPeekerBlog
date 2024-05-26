/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        rokkitt: ["Rokkitt Variable", "ui-serif"],
        kreon: ["Kreon", "Kreon Variable", "system-ui"],
        work: ["Work Sans Variable", "ui-sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        retro: {
          ...require("daisyui/src/theming/themes")["retro"],
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
        },
      },
      "dracula",
    ],
    darkTheme: "dracula",
  },
};
