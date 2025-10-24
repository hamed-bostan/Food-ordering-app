import { ProductType } from "@/application/schemas/product.schema";
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
  image?: string | StaticImageData;
  name: string;
  comment: string;
};
