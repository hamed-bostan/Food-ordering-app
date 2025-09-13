"use client";

import { useState } from "react";
import Banner from "../../../components/ui/Banner";
import FoodCategoriesList from "./FoodCategoriesList";
import Foods from "./foods";
import CheckoutButton from "./CheckoutButton";
import image1 from "@/assets/images/bannerImages/banner-05.webp";
import FoodTypesList from "./FoodTypesList";
import { ProductType } from "@/lib/schemas/product.schema";

export default function RestaurantMenu({ products }: { products: ProductType[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("نمایش همه");

  return (
    <section>
      <Banner
        styleContainer="mb-0"
        text="لذت غذای سالم و گیاهی را با ترخینه تجربه کنید!"
        isButton={false}
        imageSrc={image1}
      />
      <FoodTypesList />
      <FoodCategoriesList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        products={products}
      />
      <div className="px-5 py-6 mx-auto lg:px-10 2xl:px-28">
        <CheckoutButton />
        <Foods selectedCategory={selectedCategory} products={products} />
      </div>
    </section>
  );
}
