import { FoodProps } from "@/types/menu.types";
import FoodList from "./FoodList";

export default function Foods({ selectedCategory, products }: FoodProps) {
  const isAllCategories = selectedCategory === "نمایش همه";

  return (
    <>
      {isAllCategories ? (
        <>
          <FoodList title="غذاهای غیر ایرانی" filter="غذاهای غیر ایرانی" products={products} />
          <FoodList filter="غذاهای ایرانی" title="غذاهای ایرانی" products={products} />
          <FoodList title="پیتزاها" filter="پیتزاها" products={products} />
          <FoodList title="ساندویچ‌ها" filter="ساندویچ‌ها" products={products} />
        </>
      ) : (
        <FoodList filter={selectedCategory} title={selectedCategory} products={products} />
      )}
    </>
  );
}
