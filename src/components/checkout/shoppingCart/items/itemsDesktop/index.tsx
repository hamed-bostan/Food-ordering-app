"use client";

import { FullCartProduct } from "..";
import ItemsCard from "./ItemsCard";

interface ItemsDesktopProps {
  selectedItems: FullCartProduct[];
}

export default function ItemsDesktop({ selectedItems }: ItemsDesktopProps) {
  return (
    <div className="hidden md:flex flex-col gap-y-4 border border-[#CBCBCB] rounded-lg p-5 md:h-[25rem] lg:h-[32rem] overflow-y-scroll">
      {selectedItems.map((foodItem, index) => (
        <ItemsCard foodItem={foodItem} key={index} />
      ))}
    </div>
  );
}
