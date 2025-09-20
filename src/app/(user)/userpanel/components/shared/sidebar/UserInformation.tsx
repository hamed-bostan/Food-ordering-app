import Image from "next/image";
import image1 from "@/assets/images/avatars/01.png";
import { User } from "@/types/user.types";

export default function UserInformation({ user }: { user: User }) {
  return (
    <div className="flex items-center mb-2 gap-x-5">
      <Image
        src={user?.image || image1}
        width={100}
        height={100}
        alt="user avatar"
        className="object-cover w-20 h-20 rounded-full"
      />
      <div className="flex flex-col gap-y-2">
        <p className="text-sm text-[#353535]">{user?.name || "نام خود را وارد کنید."}</p>
        <p className="text-xs text-[#717171]">{user?.phoneNumber || "شماره تماس ثبت نشده است"}</p>
        <p className="text-xs text-[#717171]">{user?.email || "ایمیل ثبت نشده است"}</p>
      </div>
    </div>
  );
}
