import { CartState } from "../redux/reducers/cartSlice";
import { AddressState } from "../redux/reducers/addressSlice";

export type RootState = {
  cart: CartState;
  address: AddressState;
};
