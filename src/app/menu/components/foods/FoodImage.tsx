import { ProductType } from "@/lib/schemas/product.schema";
import Image from "next/image";
import fallbackImage from "@/assets/images/icons/Logo.png";

// first way for just using some of the types
type FoodImageProps = Pick<ProductType, "image" | "title">;

export default function FoodImage({ image, title }: FoodImageProps) {
  return (
    <>
      <Image
        src={image || fallbackImage}
        width={300}
        height={300}
        alt={title}
        className="w-24 h-full row-span-3 md:w-32 lg:w-40"
      />
    </>
  );
}
