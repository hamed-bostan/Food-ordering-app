import { ProductType } from "@/lib/api/getProducts";

export type FoodListProps = {
  title: string;
  filter: string;
  containerStyle?: string;
  titleStyle?: string;
  products: ProductType[];
};


export type ProductItemProps = {
  item: ProductType;
};