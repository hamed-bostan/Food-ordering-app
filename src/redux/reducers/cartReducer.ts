import { Product } from "@/lib/api";
import { CartActionTypes } from "../actions/cartActionTypes";

// CartItem extends Product by adding quantity
export type CartItem = Product & { quantity: number };

// Define cart state
export type CartState = {
  selectedItems: CartItem[];
  itemsCounter: number;
  totalPrice: number;
  checkout: boolean;
};

// Initial state
const initialState: CartState = {
  selectedItems: [],
  itemsCounter: 0,
  totalPrice: 0,
  checkout: false,
};

// Function to calculate cart totals
const sumItems = (items: CartItem[]) => {
  const itemsCounter = items.reduce(
    (total, { quantity }) => total + quantity,
    0
  );
  const totalPrice = items.reduce(
    (total, { quantity, price, discount }) =>
      total + quantity * (price - price * (discount ? discount / 100 : 0)), // Handle null discount
    0
  );

  return { itemsCounter, totalPrice };
};

// Define cart actions
type CartAction =
  | { type: CartActionTypes.ADD_ITEM; payload: Product }
  | { type: CartActionTypes.REMOVE_ITEM; payload: { id: number } }
  | { type: CartActionTypes.INCREASE; payload: { id: number } }
  | { type: CartActionTypes.DECREASE; payload: { id: number } }
  | { type: CartActionTypes.CHECKOUT }
  | { type: CartActionTypes.CLEAR };

// Reducer function
const cartReducer = (
  state: CartState = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM: {
      const exists = state.selectedItems.find(
        (item) => item.id === action.payload.id
      );

      const updatedItems = exists
        ? state.selectedItems
        : [...state.selectedItems, { ...action.payload, quantity: 1 }];

      return {
        ...state,
        selectedItems: updatedItems,
        ...sumItems(updatedItems),
        checkout: false,
      };
    }

    case CartActionTypes.REMOVE_ITEM: {
      const updatedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems: updatedItems,
        ...sumItems(updatedItems),
      };
    }

    case CartActionTypes.INCREASE: {
      const updatedItems = state.selectedItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        selectedItems: updatedItems,
        ...sumItems(updatedItems),
      };
    }

    case CartActionTypes.DECREASE: {
      const updatedItems = state.selectedItems
        .map((item) =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        selectedItems: updatedItems,
        ...sumItems(updatedItems),
      };
    }

    case CartActionTypes.CHECKOUT:
      return { ...initialState, checkout: true };

    case CartActionTypes.CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;
