/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent-color)",
      },
      backgroundColor: {
        surface: "var(--bg-surface)",
        "surface-light": "var(--bg-surface-light)",
      },
      borderColor: {
        "surface-highlight": "var(--border-surface-highlight)",
        surface: "var(--border-surface)",
      },
      outlineColor: {
        "surface-highlight": "var(--border-surface-highlight)",
        surface: "var(--border-surface)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
      },
      textColor: {
        disabled: "var(--text-disabled)",
      },
    },
  },
  plugins: [],
};
