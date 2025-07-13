import { ProductType } from "@/lib/api/getProducts";
import { Dispatch, SetStateAction } from "react";

export type CategorySetter = {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export type CategorySelectionState = CategorySetter & {
  selectedCategory: string;
};

export type FoodCategoriesListProps = CategorySelectionState & {
  products: ProductType[];
};

export type FoodCategoriesCardProps = CategorySetter & {
  item: string;
  isSelected: boolean;
};

export type FoodsProps = {
  selectedCategory: string;
  products: ProductType[];
  loading: boolean;
  error: string | null;
};

export type FoodListProps = {
  filter: string;
  title?: string;
  products: ProductType[];
};