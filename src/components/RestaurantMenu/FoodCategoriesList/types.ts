import { Dispatch, SetStateAction } from "react";
import { Product } from "@/lib/api";

export type FoodCategoriesListProps = {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  products: Product[];
};

export type FoodCategoriesCardProps = {
  item: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  isSelected: boolean;
};
