import { CartState } from "./reducers/cartSlice";
import { AddressState } from "./reducers/addressSlice";

export type RootState = {
  cart: CartState;
  address: AddressState;
};
