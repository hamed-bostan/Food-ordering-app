import Image from "next/image";
import { highlightDetails } from "../lib/highlightDetails";

export default function Highlights() {
  return (
    <div className="grid grid-cols-4 place-items-center py-9">
      {highlightDetails.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center gap-y-4 min-h-36"
        >
          <Image src={item.image} alt={item.text} className="w-20 h-20" />
          <span className="text-center">{item.text}</span>
        </div>
      ))}
    </div>
  );
}
