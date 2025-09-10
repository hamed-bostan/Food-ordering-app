"use client";

import Image from "next/image";
import image1 from "@/assets/images/avatars/01.png";
import { useUser } from "@/lib/hooks/useUser";
import { useSession } from "next-auth/react";

export default function UserInformation() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: userData, isLoading } = useUser(userId);

  if (isLoading || !userData) return <p>در حال بارگذاری اطلاعات...</p>;

  return (
    <div className="flex items-center mb-2 gap-x-5">
      <Image
        src={userData?.image || image1}
        width={100}
        height={100}
        alt="user avatar"
        className="object-cover w-20 h-20 rounded-full"
      />
      <div className="flex flex-col gap-y-2">
        <p className="text-sm text-[#353535]">{userData?.name || "نام خود را وارد کنید."}</p>
        <p className="text-xs text-[#717171]">{userData?.phoneNumber || "شماره تماس ثبت نشده است"}</p>
        <p className="text-xs text-[#717171]">{userData?.email || "ایمیل ثبت نشده است"}</p>
      </div>
    </div>
  );
}
