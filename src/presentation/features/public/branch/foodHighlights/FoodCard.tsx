"use client";

import Image from "next/image";
import { ProductItemProps } from "@/types/branch.types";
import { OfferDetails } from "./OfferDetails";

export default function FoodCard({ item }: ProductItemProps) {
  return (
    <article className="bg-[#fff] border border-[#CBCBCB] overflow-hidden rounded-sm w-48 md:w-52 md:rounded-lg">
      <DisplayingImage item={item} />
      <OfferDetails item={item} />
    </article>
  );
}

function DisplayingImage({ item }: ProductItemProps) {
  const { image, title } = item;
  return <Image src={image ?? ""} alt={title} width={110} height={110} className="object-cover w-full h-28 md:h-36" />;
}
