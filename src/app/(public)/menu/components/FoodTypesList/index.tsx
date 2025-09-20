import { foodTypesList } from "@/types/menu-food-types-list";
import FoodTypesItem from "./FoodTypesItem";

export default function FoodTypesList() {
  return (
    <ul className="flex gap-x-4 bg-[#EDEDED] mb-2 px-5 lg:px-10 2xl:px-28 h-10 md:gap-x-6 md:h-12 md:mb-4">
      {foodTypesList.map((item) => (
        <li className="flex items-center" key={item.id}>
          <FoodTypesItem {...item} />
        </li>
      ))}
    </ul>
  );
}
