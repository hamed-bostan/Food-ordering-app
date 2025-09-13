"use client";

import FoodList from "./FoodList";
import { ProductType } from "@/lib/schemas/product.schema";

export default function FoodHighlights({ products }: { products: ProductType[] }) {
  return (
    <section>
      <FoodList title="پیشنهاد ویژه" filter="پیشنهاد ویژه" products={products} />
      <FoodList
        title="غذاهای محبوب"
        filter="غذاهای محبوب"
        containerStyle="bg-[#315F41]"
        titleStyle="text-[#fff]"
        products={products}
      />
      <FoodList title="غذاهای غیر ایرانی" filter="غذاهای غیر ایرانی" products={products} />
    </section>
  );
}
