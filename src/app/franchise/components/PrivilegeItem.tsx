import Image from "next/image";
import franchiseIcon from "@/assets/images/icons/franchise-icon.svg";
import { PrivilegeDetailsProp } from "../lib/types";

export default function PrivilegeItem({ text }: PrivilegeDetailsProp) {
  return (
    <div className="flex items-center gap-x-1 ">
      <Image
        src={franchiseIcon}
        alt="franchise icon"
        width={25}
        height={25}
        className="w-4 h-4"
      />
      <span className="text-nowrap">{text}</span>
    </div>
  );
}
