import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/lib/api";

// CartItem extends Product by adding quantity
export type CartItem = Product & { quantity: number };

// Define cart state
export type CartState = {
  selectedItems: CartItem[];
  itemsCounter: number;
  totalPrice: number;
  checkout: boolean;
};

const initialState: CartState = {
  selectedItems: [],
  itemsCounter: 0,
  totalPrice: 0,
  checkout: false,
};

// Helper to calculate totals
const sumItems = (items: CartItem[]) => {
  const itemsCounter = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (item.price - item.price * (item.discount ? item.discount / 100 : 0)),
    0
  );

  return { itemsCounter, totalPrice };
};

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const exists = state.selectedItems.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      const totals = sumItems(state.selectedItems);
      state.itemsCounter = totals.itemsCounter;
      state.totalPrice = totals.totalPrice;
      state.checkout = false;
    },

    increase: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.selectedItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) item.quantity += 1;
      const totals = sumItems(state.selectedItems);
      state.itemsCounter = totals.itemsCounter;
      state.totalPrice = totals.totalPrice;
    },

    decrease: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.selectedItems.find(
        (item) => item.id === action.payload.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.selectedItems = state.selectedItems.filter(
        (item) => item.quantity > 0
      );
      const totals = sumItems(state.selectedItems);
      state.itemsCounter = totals.itemsCounter;
      state.totalPrice = totals.totalPrice;
    },

    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      const totals = sumItems(state.selectedItems);
      state.itemsCounter = totals.itemsCounter;
      state.totalPrice = totals.totalPrice;
    },

    checkout: (state) => {
      return { ...initialState, checkout: true };
    },

    clear: () => initialState,
  },
});

export const { addItem, removeItem, increase, decrease, checkout, clear } =
  cartSlice.actions;

export default cartSlice.reducer;
