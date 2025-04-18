"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { useEffect } from "react";
import createEmotionCache from "@/lib/createEmotionCache";
import theme from "@/lib/theme";

const cacheRtl = createEmotionCache();

export default function MUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.dir = "rtl";
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
