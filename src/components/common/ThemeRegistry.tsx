"use client";

import { ReactNode, useState } from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "@/lib/createEmotionCache";
import theme from "@/lib/theme";

type ThemeRegistryProps = {
  children: ReactNode;
};

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  // Create a new emotion cache on the client
  const [cache] = useState(() => createEmotionCache());

  return (
    <CacheProvider value={cache}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}
