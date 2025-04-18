// types.ts

import { CartState } from "./reducers/cartReducer";
import { AddressState } from "./reducers/addressSlice";

export type RootState = {
  cart: CartState;
  address: AddressState;
};
