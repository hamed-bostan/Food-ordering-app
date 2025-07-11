"use client";

import Image from "next/image";
import { Favorite, Star } from "@mui/icons-material";
import formatToPersianStyle from "@/lib/formattedPrice";
import discountPrice from "@/lib/discountPrice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductType } from "@/lib/productApi";

type FoodCardProps = {
  item: ProductType;
};

export default function FoodCard({ item }: FoodCardProps) {
  return (
    <div className="border border-[#CBCBCB] rounded-sm overflow-hidden md:rounded-lg">
      <DisplayingImage image={item.image} title={item.title} />
      <OfferDetails item={item} />
    </div>
  );
}

type FoodImageProps = Pick<ProductType, "image" | "title">;

function DisplayingImage({ image, title }: FoodImageProps) {
  return (
    <Image
      src={image}
      alt={title}
      width={110}
      height={110}
      className="object-cover w-full h-24 md:h-36"
    />
  );
}

function OfferDetails({ item }: FoodCardProps) {
  const { id, title, price, discount } = item;
  const discountedPrice = formatToPersianStyle(discountPrice(price, discount));

  const dispatch = useDispatch();

  // Access the cart from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.selectedItems);
  const isAddedToCart = cartItems.some((item) => item.id === id); // Check if the item is in the cart

  return (
    <section className="grid grid-cols-[1fr_auto] p-2 gap-y-2 md:gap-y-3 md:p-3 text-[#353535] text-xs md:text-sm h-32 md:h-40">
      <h3 className="md:font-semibold">{title}</h3>
      <Favorite
        sx={{ color: "#C30000", fontSize: { xs: 16, md: 18 } }}
        className="col-start-2 mr-auto cursor-pointer"
      />
      <div className="flex items-center row-start-2 gap-x-1">
        <Star sx={{ color: "#F4B740", fontSize: { xs: 16, md: 18 } }} />
        <output className="md:hidden">5</output>
      </div>
      <p className="flex self-center row-start-2 mr-auto ">
        {discountedPrice} تومان
      </p>
    </section>
  );
}
