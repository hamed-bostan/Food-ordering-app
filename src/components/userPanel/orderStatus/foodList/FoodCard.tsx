"use client";

import Image from "next/image";
import formatToPersianStyle from "@/lib/formattedPrice";
import discountPrice from "@/lib/discountPrice";
import { CartItem } from "@/redux/reducers/cartReducer";

type FoodCardProps = {
  item: CartItem;
};

export default function FoodCard({ item }: FoodCardProps) {
  const { title, price, discount, image, quantity } = item;
  const discountedPrice = formatToPersianStyle(discountPrice(price, discount));

  return (
    <div className="text-xs border border-[#CBCBCB] rounded-lg overflow-hidden">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={110}
          height={110}
          className="h-12 w-full object-cover md:h-20"
        />
        <span className="text-[#417F56] absolute bottom-1 left-1 bg-[#FFFFFF] p-0.5 rounded-sm">
          {formatToPersianStyle(quantity)} x
        </span>
      </div>
      <div className="text-center py-1 text-[#353535]">
        <h3 className="mb-1">{title}</h3>
        <span className="block">{discountedPrice} تومان</span>
      </div>
    </div>
  );
}
