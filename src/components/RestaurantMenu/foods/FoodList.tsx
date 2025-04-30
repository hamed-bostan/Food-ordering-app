import { ProductType } from "@/hooks/useProducts";
import FoodCard from "./FoodCard";

type FoodListProps = {
  filter: string;
  title?: string;
  products: ProductType[];
};

export default function FoodList({ filter, title, products }: FoodListProps) {
  const filteredFood = products.filter((item) => item.category === filter);

  return (
    <>
      {title && (
        <h3 className="text-sm text-[#353535] font-bold self-end md:text-lg mb-3 md:mb-5">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 mb-6 gap-y-3 md:grid-cols-2 md:gap-5">
        {filteredFood.map((foodItem, index) => {
          return <FoodCard foodItem={foodItem} key={index} />;
        })}
      </div>
    </>
  );
}
