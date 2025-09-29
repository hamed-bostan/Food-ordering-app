import { ProductType } from "@/application/schemas/product.schema";
import FoodDetails from "./FoodDetails";
import FoodImage from "./FoodImage";

type FoodCardProps = {
  foodItem: ProductType;
};

export default function FoodCard({ foodItem }: FoodCardProps) {
  return (
    <>
      <FoodImage {...foodItem} />
      <FoodDetails foodItem={foodItem} />
    </>
  );
}
