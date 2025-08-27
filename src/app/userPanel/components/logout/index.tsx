"use client";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useLogoutDialog } from "@/app/userPanel/context/LogoutContext";
import TitleContent from "./TitleContent";
import MainContent from "./MainContent";

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
          <TitleContent />
        </DialogTitle>
        <DialogContent
          sx={{
            padding: 0,
          }}
        >
          <MainContent />
        </DialogContent>
      </Dialog>
    </div>
  );
}
