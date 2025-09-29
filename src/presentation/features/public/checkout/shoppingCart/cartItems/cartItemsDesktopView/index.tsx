"use client";

import { ItemsDesktopProps } from "@/types/shopping-cart.types";
import CartItemCard from "./CartItemCard";

export default function CartItemsDesktopView({ selectedItems }: ItemsDesktopProps) {
  return (
    <ul className="hidden md:flex flex-col gap-y-4 border border-[#CBCBCB] rounded-lg p-5 md:h-[25rem] lg:h-[32rem] overflow-y-scroll">
      {selectedItems.map((foodItem, index) => (
        <li key={index}>
          <CartItemCard foodItem={foodItem} />
        </li>
      ))}
    </ul>
  );
}
