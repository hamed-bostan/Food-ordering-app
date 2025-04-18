// persistConfig.ts

import storage from "redux-persist/lib/storage"; // Default local storage for web

const persistConfig = {
  key: "root", // key to store the persisted state
  storage, // storage engine (localStorage for web)
  whitelist: ["cart", "address"], // list of reducers to persist (cart and address in your case)
};

export default persistConfig;
