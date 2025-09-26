import { HighlightDetailsProp } from "@/types/franchise.types";
import Image from "next/image";

export default function HighlightItem({ text, image }: HighlightDetailsProp) {
  return (
    <div className="flex flex-col items-center gap-y-4 min-h-36">
      <Image src={image} alt={text} className="w-20 h-20" />
      <span className="text-center">{text}</span>
    </div>
  );
}
