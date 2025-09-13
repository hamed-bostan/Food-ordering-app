import { ProductType } from "@/lib/schemas/product.schema";
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
};

export type FoodListProps = {
  filter: string;
  title?: string;
  products: ProductType[];
};
