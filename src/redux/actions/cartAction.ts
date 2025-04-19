import { CartActionTypes } from "./cartActionTypes";
import { Product } from "@/lib/api";

// Action creators
export const addItem = (product: Product) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: product,
});

export const increase = (id: number) => ({
  type: CartActionTypes.INCREASE,
  payload: { id },
});

export const decrease = (id: number) => ({
  type: CartActionTypes.DECREASE,
  payload: { id },
});

export const removeItem = (id: number) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: { id },
});

export const checkout = () => ({
  type: CartActionTypes.CHECKOUT,
});

export const clear = () => ({
  type: CartActionTypes.CLEAR,
});

// Type for Cart actions
export type CartAction =
  | ReturnType<typeof addItem>
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof checkout>
  | ReturnType<typeof clear>;
