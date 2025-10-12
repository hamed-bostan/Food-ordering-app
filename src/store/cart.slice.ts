import { ProductType } from "@/application/schemas/product.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./cart.types";

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
    (sum, item) => sum + item.quantity * (item.price - item.price * (item.discount ? item.discount / 100 : 0)),
    0
  );
  return { itemsCounter, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductType>) => {
      const exists = state.selectedItems.find((item) => item.id === action.payload.id);

      // Normalize numeric fields
      const newItem = {
        ...action.payload,
        price: Number(action.payload.price),
        discount: Number(action.payload.discount) || 0,
        quantity: 1,
      };

      if (!exists) {
        state.selectedItems.push(newItem);
      }

      const totals = sumItems(state.selectedItems);
      state.itemsCounter = totals.itemsCounter;
      state.totalPrice = totals.totalPrice;
      state.checkout = false;
    },

    increase: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.selectedItems.find((item) => item.id === action.payload.id);
      if (item) item.quantity = Number(item.quantity) + 1;

      const totals = sumItems(state.selectedItems);
      state.itemsCounter = totals.itemsCounter;
      state.totalPrice = totals.totalPrice;
    },

    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.selectedItems.find((item) => item.id === action.payload.id);
      if (item) item.quantity = Math.max(Number(item.quantity) - 1, 0);

      state.selectedItems = state.selectedItems.filter((item) => item.quantity > 0);

      const totals = sumItems(state.selectedItems);
      state.itemsCounter = totals.itemsCounter;
      state.totalPrice = totals.totalPrice;
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedItems = state.selectedItems.filter((item) => item.id !== action.payload.id);

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

export const { addItem, removeItem, increase, decrease, checkout, clear } = cartSlice.actions;

export default cartSlice.reducer;
