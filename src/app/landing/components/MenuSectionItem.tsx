import Image from "next/image";
import { MenuItemProps } from "../lib/menu-data";

export default function MenuSectionItem({ image, text }: MenuItemProps) {
  return (
    <li className="relative flex justify-center w-full list-none h-28 lg:h-36">
      <figure className="flex justify-center">
        <Image src={image} alt={text} className="object-contain w-full" />
        <div className="bg-[#417F56] shadow-xl w-full h-20 rounded-sm absolute top-1/2 -z-10 lg:h-24 max-w-56 md:max-w-full"></div>
        <figcaption className="text-xs w-24 h-8 bg-[#F9F9F9] rounded-sm shadow-md flex items-center justify-center absolute -bottom-1/2 -translate-y-1/2 md:text-base  lg:bottom-0 lg:translate-y-full lg:w-32 lg:h-10">
          {text}
        </figcaption>
      </figure>
    </li>
  );
}
