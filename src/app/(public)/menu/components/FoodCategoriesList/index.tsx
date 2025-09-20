import { FoodCategoriesListProps } from "@/types/menu.types";
import FoodCategoriesCard from "./FoodCategoriesCard";

export default function FoodCategoriesList({
  setSelectedCategory,
  selectedCategory,
  products,
}: FoodCategoriesListProps) {
  const FoodCategories = [
    "نمایش همه",
    ...new Set(products.map((item) => item.category)),
    "پرفروش‌ترین",
    "اقتصادی‌ترین",
  ];

  return (
    <ul className="flex flex-wrap gap-2 px-5 md:gap-3 lg:px-10 2xl:px-28">
      {FoodCategories.map((item, index) => (
        <li key={index}>
          <FoodCategoriesCard
            item={item}
            setSelectedCategory={setSelectedCategory}
            isSelected={selectedCategory === item}
          />
        </li>
      ))}
    </ul>
  );
}
