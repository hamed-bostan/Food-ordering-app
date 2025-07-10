import FoodCategoriesCard from "./FoodCategoriesCard";
import { FoodCategoriesListProps } from "./types";

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
    <ul className="flex gap-2 flex-wrap md:gap-3 px-5 lg:px-10 2xl:px-28">
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
