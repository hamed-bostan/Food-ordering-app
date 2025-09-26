import { CategoriesListProps } from "@/types/menu.types";
import CategoryCard from "./CategoryCard";

export default function CategoriesList({ setSelectedCategory, selectedCategory, products }: CategoriesListProps) {
  const categoryOptions = [
    "نمایش همه",
    ...new Set(products.map((item) => item.category)),
    "پرفروش‌ترین",
    "اقتصادی‌ترین",
  ];

  return (
    <ul className="flex flex-wrap gap-2 px-5 md:gap-3 lg:px-10 2xl:px-28">
      {categoryOptions.map((item, index) => (
        <li key={index}>
          <CategoryCard item={item} setSelectedCategory={setSelectedCategory} isSelected={selectedCategory === item} />
        </li>
      ))}
    </ul>
  );
}
