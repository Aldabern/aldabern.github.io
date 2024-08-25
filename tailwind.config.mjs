/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundColor: {
        surface: "var(--bg-surface)",
        "surface-light": "var(--bg-surface-light)",
      },
      borderColor: {
        surface: "var(--border-surface)",
        "surface-disabled": "var(--border-surface-disabled)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
      },
      textColor: {
        disabled: "var(--text-disabled)",
        accent: "var(--text-accent)",
      },
    },
  },
  plugins: [],
};
