import { ProductType } from "@/application/schemas/product.schema";

// Extend Product to include quantity from CartItem
export type FullCartProduct = ProductType & {
  quantity: number;
};

export type ItemsDesktopProps = {
  selectedItems: FullCartProduct[];
};

export type FoodItemProps = {
  foodItem: FullCartProduct;
};

// Reuse properties from FullCartProduct
export type FoodImageProps = Pick<FullCartProduct, "image" | "title">;

export type ItemsOverviewMobileProps = {
  selectedItems: ProductType[];
  containerStyle?: string;
};
