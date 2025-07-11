"use client";

import { createTheme, ThemeOptions } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
  direction: "rtl", // Enables RTL globally
  typography: {
    fontFamily: "var(--font-custom)", // Use the CSS variable from global.css
  },
});

export default theme;
