import Image from "next/image";
import expandDesktopIcon from "@/assets/images/icons/expand-desktop.svg";
import { DisplayImageProps } from "../lib/types";

export default function DisplayImage({ image, title }: DisplayImageProps) {
  return (
    <div className="relative">
      <Image
        src={image}
        alt={title}
        priority
        className="object-cover w-full h-28 md:h-52"
      />
      <div className="hidden md:block absolute inset-0 bg-[#181818] opacity-0 group-hover:opacity-65 transition-opacity duration-300 z-20"></div>
      <Image
        width={40}
        height={40}
        src={expandDesktopIcon}
        alt="expand icon"
        className="absolute z-30 hidden w-12 h-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 left-1/2 md:group-hover:block"
      />
    </div>
  );
}
