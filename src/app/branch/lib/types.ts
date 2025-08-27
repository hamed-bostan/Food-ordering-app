import { ProductType } from "@/lib/api/getProducts";
import { StaticImageData } from "next/image";

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

export type TestimonialProps = {
  id: number;
  image: StaticImageData;
  name: string;
  date: string;
  comment: string;
};
