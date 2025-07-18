import { ProductType } from "@/lib/api/getProducts";
import Image from "next/image";

// first way for just using some of the types
type FoodImageProps = Pick<ProductType, "image" | "title">;

export default function FoodImage({ image, title }: FoodImageProps) {
  return (
    <Image
      src={image}
      width={300}
      height={300}
      alt={title}
      className="w-24 h-full row-span-3 md:w-32 lg:w-40"
    />
  );
}

