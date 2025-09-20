import { combineReducers } from "redux";
import cartReducer from "./cart.slice";
import { CartState } from "./cart.types";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export type RootState = {
  cart: CartState;
};

// Ensure that the initial state is not undefined
const combinedReducer = (state: RootState | undefined, action: any): RootState => {
  if (state === undefined) {
    return {
      cart: {
        selectedItems: [],
        itemsCounter: 0,
        totalPrice: 0,
        checkout: false,
      },
    };
  }

  return rootReducer(state, action);
};

export default combinedReducer;
