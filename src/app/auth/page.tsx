"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/icons/Logo.png";

export default function AuthPage() {
  return (
    <>
      <div className="flex flex-col items-center pb-20 pt-14">
        <Image src={logo} alt="logo image" className="h-20 mb-20 w-52" />
        <p className="text-[#353535] font-[700] text-lg mb-6">ورود / ثبت‌نام</p>
        <div className="flex flex-col items-center mb-5 gap-y-6">
          <Link
            href="/api/auth/signin?callbackUrl=/userPanel"
            className="bg-[#417F56] text-white px-4 py-2 rounded hover:bg-[#2f6341] transition min-w-52 text-center"
          >
            از طریق گیت هاب
          </Link>

          <Link
            href="/auth/otp"
            className="bg-[#417F56] text-white px-4 py-2 rounded hover:bg-[#2f6341] transition min-w-52"
          >
            از طریق رمز یک بار مصرف
          </Link>
        </div>
        <p className="text-[#353535] text-xs text-center">
          ورود و عضویت در ترخینه به منزله قبول
          <span className="text-[#417F56]"> قوانین و مقررات </span> است.
        </p>
      </div>
    </>
  );
}
