import { ProductType } from "@/lib/productApi";
import { Dispatch, SetStateAction } from "react";

export type FoodCategoriesListProps = {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  products: ProductType[];
};

export type FoodCategoriesCardProps = {
  item: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  isSelected: boolean;
};
