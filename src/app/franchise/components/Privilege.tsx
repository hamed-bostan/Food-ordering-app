import Image from "next/image";
import franchiseIcon from "@/assets/images/icons/franchise-icon.svg";
import { PrivilegeDetails } from "../lib/PrivilegeDetails";

export default function Privilege() {
  return (
    <div className="py-9">
      <h2 className="mb-6 font-bold text-center">مزیت دریافت نمایندگی</h2>
      <div className="grid max-w-2xl grid-cols-2 mx-auto gap-y-4">
        {PrivilegeDetails.map((item) => (
          <div key={item.id} className="flex items-center gap-x-1 ">
            <Image
              src={franchiseIcon}
              alt="franchise icon"
              width={25}
              height={25}
              className="w-4 h-4"
            />
            <span className="text-nowrap">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
