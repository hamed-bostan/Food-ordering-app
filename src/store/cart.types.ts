import { ProductType } from "@/domain/product.schema";

// CartItem extends Product by adding quantity
export type CartItem = ProductType & { quantity: number };

// Define cart state
export type CartState = {
  selectedItems: CartItem[];
  itemsCounter: number;
  totalPrice: number;
  checkout: boolean;
};

