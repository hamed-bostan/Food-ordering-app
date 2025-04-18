const rtl = require("tailwindcss-rtl");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // for App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // for Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ], // adjust paths as needed
  theme: {
    extend: {},
  },
  plugins: [rtl],
};
