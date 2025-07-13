import { FoodListProps } from "../../lib/types";
import FoodCard from "./FoodCard";

export default function FoodList({ filter, title, products }: FoodListProps) {
  const filteredFood = products.filter((item) => item.category === filter);

  return (
    <>
      {title && (
        <h2 className="text-sm text-[#353535] font-bold self-end md:text-lg mb-3 md:mb-5">
          {title}
        </h2>
      )}
      <ul className="grid grid-cols-1 mb-6 gap-y-3 md:grid-cols-2 md:gap-5">
        {filteredFood.map((foodItem) => (
          <li
            key={foodItem.id}
            className="min-h-24 grid grid-cols-[auto_1fr_1fr] grid-rows-3 border border-[#CBCBCB] rounded-sm overflow-hidden md:hover:shadow-md md:min-h-32 lg:rounded-lg"
          >
            <FoodCard foodItem={foodItem} />
          </li>
        ))}
      </ul>
    </>
  );
}
