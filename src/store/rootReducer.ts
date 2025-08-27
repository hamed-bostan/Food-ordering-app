import { combineReducers } from "redux";
import cartReducer, { CartState } from "../redux/slices/cart/cartSlice";
import addressReducer, {
  AddressState,
} from "../redux/slices/address/addressSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  address: addressReducer,
});

export type RootState = {
  cart: CartState;
  address: AddressState;
};

// Ensure that the initial state is not undefined
const combinedReducer = (
  state: RootState | undefined,
  action: any
): RootState => {
  if (state === undefined) {
    return {
      cart: {
        selectedItems: [],
        itemsCounter: 0,
        totalPrice: 0,
        checkout: false,
      },
      address: { addresses: [] },
    };
  }

  return rootReducer(state, action);
};

export default combinedReducer;
