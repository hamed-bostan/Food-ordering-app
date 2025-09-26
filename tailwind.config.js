/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
      screens: {
        "2xl": "1440px",
      },
      colors: {
        primary: "#1D4ED8", // Example: Blue-700
        secondary: "#9333EA", // Example: Purple-600
        accent: "#FACC15", // Example: Yellow-400
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-rtl")],
};
