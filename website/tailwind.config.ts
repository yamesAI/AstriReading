import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf9e7",
          100: "#faf0c2",
          200: "#f5de88",
          300: "#eec84d",
          400: "#e5b025",
          500: "#c9911a",
          600: "#a87015",
          700: "#865313",
          800: "#6e4215",
          900: "#5e3716",
        },
        midnight: {
          50: "#eef2ff",
          100: "#e0e7ff",
          700: "#2d2a5e",
          800: "#1e1b4b",
          900: "#0f0c29",
          950: "#07051a",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      backgroundImage: {
        "star-field": "radial-gradient(ellipse at top, #1e1b4b 0%, #07051a 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
