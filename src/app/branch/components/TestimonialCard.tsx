import Image from "next/image";
import starRateIcon from "@/assets/images/icons/star-rate.svg";
import { TestimonialProps } from "../lib/types";

export default function TestimonialCard({
  name,
  comment,
  date,
  image,
}: TestimonialProps) {
  return (
    <article className="border border-[#CBCBCB] rounded-sm grid grid-cols-[auto_1fr] p-4 text-xs text-[#353535] lg:text-sm">
      <Image
        src={image}
        alt={`Profile image of ${name}`}
        width={80}
        height={80}
        className="block mx-auto mb-1 w-14 h-14 md:w-20 md:h-20 md:mb-2"
      />
      <p className="col-start-2 row-span-3 pt-2 pr-3 text-justify col-span-full md:p-4">
        {comment}
      </p>
      <p className="text-[#717171] text-center md:mb-1">{name}</p>
      <p className="text-[#717171] text-center">{date}</p>
      <figure className="flex items-center justify-end col-start-2 gap-x-1 md:gap-x-2">
        <Image
          src={starRateIcon}
          alt="star rate icon"
          className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
        />
        <output className="text-sm lg:text-base">3</output>
      </figure>
    </article>
  );
}
