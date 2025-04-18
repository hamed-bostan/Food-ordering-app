"use client";

import { useProducts } from "@/hooks/useProducts";
import FoodList from "./FoodList";

export default function FoodHighlights() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>در حال بارگزاری ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <FoodList
        title="پیشنهاد ویژه"
        filter="پیشنهاد ویژه"
        products={products}
      />
      <FoodList
        title="غذاهای محبوب"
        filter="غذاهای محبوب"
        containerStyle="bg-[#315F41]"
        titleStyle="text-[#fff]"
        products={products}
      />
      <FoodList
        title="غذاهای غیر ایرانی"
        filter="غذاهای غیر ایرانی"
        products={products}
      />
    </>
  );
}
