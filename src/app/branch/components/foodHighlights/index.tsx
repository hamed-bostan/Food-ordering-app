"use client";

import { getProducts } from "@/lib/api/products";
import FoodList from "./FoodList";
import { useQuery } from "@tanstack/react-query";

export default function FoodHighlights() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <div>در حال بارگزاری ...</div>;
  if (isError) return <div>{(error as Error).message}</div>;

  return (
    <section>
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
    </section>
  );
}
