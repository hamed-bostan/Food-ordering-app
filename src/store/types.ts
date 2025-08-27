import { CartState } from "../redux/slices/cart/cartSlice";
import { AddressState } from "../redux/slices/address/addressSlice";

export type RootState = {
  cart: CartState;
  address: AddressState;
};
