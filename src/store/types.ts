import { CartState } from "../shared/redux/cart/cartSlice";
import { AddressState } from "../shared/redux/address/addressSlice";

export type RootState = {
  cart: CartState;
  address: AddressState;
};
