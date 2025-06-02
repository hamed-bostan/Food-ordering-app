"use client";

import { FullCartProduct } from "..";
import ItemsCard from "./ItemsCard";

type ItemsDesktopProps = {
  selectedItems: FullCartProduct[];
};

export default function ItemsDesktop({ selectedItems }: ItemsDesktopProps) {
  return (
    <ul className="hidden md:flex flex-col gap-y-4 border border-[#CBCBCB] rounded-lg p-5 md:h-[25rem] lg:h-[32rem] overflow-y-scroll">
      {selectedItems.map((foodItem, index) => (
        <li key={index}>
          <ItemsCard foodItem={foodItem} />
        </li>
      ))}
    </ul>
  );
}
