import storage from "redux-persist/lib/storage"; // Default local storage for web

const persistConfig = {
  key: "root", // key to store the persisted state
  storage, // storage engine (localStorage for web)
  whitelist: ["cart"], // list of reducers to persist
};

export default persistConfig;
