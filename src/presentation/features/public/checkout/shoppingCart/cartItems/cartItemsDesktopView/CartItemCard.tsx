import Image from "next/image";
import FoodDetails from "./FoodDetails";
import { FoodImageProps, FoodItemProps } from "@/types/shopping-cart.types";

export default function CartItemCard({ foodItem }: FoodItemProps) {
  return (
    <section className="min-h-24 grid grid-cols-[auto_1fr_1fr] grid-rows-3 border border-[#CBCBCB] rounded-sm overflow-hidden md:hover:shadow-md md:min-h-32 lg:min-h-36 lg:rounded-lg">
      <FoodImage {...foodItem} />
      <FoodDetails foodItem={foodItem} />
    </section>
  );
}

function FoodImage({ image, title }: FoodImageProps) {
  return <Image src={image ?? ""} width={300} height={300} alt={title} className="w-24 h-full row-span-3 md:w-28 lg:w-40" />;
}
