"use client";

import CustomButton from "@/components/ui/CustomButton";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLogoutDialog } from "@/app/userPanel/context/LogoutContext";
import Link from "next/link";

export default function Logout() {
  const { isLogoutDialogOpen, closeLogoutDialog } = useLogoutDialog();

  return (
    <div>
      <Dialog
        open={isLogoutDialogOpen}
        onClose={closeLogoutDialog}
        sx={{
          "& .MuiDialog-paper": {
            width: { xs: "20rem", lg: " 23.75rem" },
            margin: 0,
            padding: 0,
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: 0,
            w: "100%",
            position: "relative",
            backgroundColor: "#EDEDED",
          }}
        >
          <div className="h-14">
            <p className="text-sm font-medium md:text-base md:font-semibold text-[#353535] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              خروج
            </p>

            <Button
              onClick={closeLogoutDialog}
              sx={{
                color: "#717171",
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: 0,
          }}
        >
          <div className="px-6 py-4 lg:pt-8 lg:pb-6 lg:px-14">
            <p className="text-[#353535] text-xs text-center mb-8 md:text-sm">
              آیا مایل به خروج از حساب کاربری خود هستید؟
            </p>
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
              <Link
                role="button"
                href="/api/auth/signout?callbackUrl=/"
                className="bg-[#FFF2F2] text-[#C30000] w-full text-xs md:text-sm hover:bg-[#C30000] hover:text-[#FFF] rounded flex items-center justify-center px-4"
              >
                خروج
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
