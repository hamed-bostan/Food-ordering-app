"use client";

import CustomButton from "@/components/ui/CustomButton";
import { useLogoutDialog } from "@/context/logout-dialog.context";
import { signOut } from "next-auth/react";

export default function MainContent() {
  const { closeLogoutDialog } = useLogoutDialog();

  return (
    <div className="px-6 py-4 lg:pt-8 lg:pb-6 lg:px-14">
      <p className="text-[#353535] text-xs text-center mb-8 md:text-sm">آیا مایل به خروج از حساب کاربری خود هستید؟</p>
      <div className="flex gap-x-4">
        <CustomButton
          onClick={closeLogoutDialog}
          disableElevation
          sx={{
            width: "100%",
            fontSize: { xs: "12px", lg: "14px" },
            height: { xs: "32px", lg: "38px" },
          }}
        >
          بازگشت
        </CustomButton>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-[#FFF2F2] text-[#C30000] w-full text-xs md:text-sm hover:bg-[#C30000] hover:text-[#FFF] rounded flex items-center justify-center px-4"
        >
          خروج
        </button>
      </div>
    </div>
  );
}
