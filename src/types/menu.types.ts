import { ProductType } from "@/application/schemas/product.schema";
import { Dispatch, SetStateAction } from "react";

// state
export type CategoryState = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

// components
export type CategoriesListProps = CategoryState & {
  products: ProductType[];
};

export type CategoryCardProps = {
  item: string;
  isSelected: boolean;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export type FoodProps = {
  selectedCategory: string;
  products: ProductType[];
};

export type FoodListProps = {
  filter: string;
  title?: string;
  products: ProductType[];
};
