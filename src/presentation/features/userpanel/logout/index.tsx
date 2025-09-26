"use client";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useLogoutDialog } from "@/context/logout-dialog.context";
import LogoutBody from "./LogoutBody";
import LogoutTitle from "./LogoutTitle";

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
          <LogoutTitle />
        </DialogTitle>
        <DialogContent
          sx={{
            padding: 0,
          }}
        >
          <LogoutBody />
        </DialogContent>
      </Dialog>
    </div>
  );
}
