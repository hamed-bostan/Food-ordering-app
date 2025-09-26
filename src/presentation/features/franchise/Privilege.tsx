import { PrivilegeDetails } from "@/presentation/constants/franchise";
import PrivilegeItem from "./PrivilegeItem";

export default function Privilege() {
  return (
    <div className="py-9">
      <h2 className="mb-6 font-bold text-center">مزیت دریافت نمایندگی</h2>
      <div className="grid max-w-2xl grid-cols-2 mx-auto gap-y-4">
        {PrivilegeDetails.map((item) => (
          <PrivilegeItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
