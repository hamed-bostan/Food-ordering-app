// persistReducer.ts
import { persistReducer } from "redux-persist";
import rootReducer from "./rootReducer"; // Ensure the path is correct
import persistConfig from "./persistConfig";

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
