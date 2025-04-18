import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const createEmotionCache = () => {
  return createCache({
    key: "mui-rtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
};

export default createEmotionCache;
