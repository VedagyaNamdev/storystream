import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          // Define light theme colors
          colors: {
            primary: {
              DEFAULT: "#5253A3", // Primary color for light theme
            },
          },
        },
        dark: {
          // Define dark theme colors
          colors: {},
        },
        // ... custom themes if needed
      },
    }),
    // plugins: [require("tailwindcss-animate")], // Uncomment if needed
  ],
};
