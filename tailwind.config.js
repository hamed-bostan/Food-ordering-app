const rtl = require("tailwindcss-rtl");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], // adjust paths as needed
  theme: {
    extend: {},
  },
  plugins: [rtl],
};
