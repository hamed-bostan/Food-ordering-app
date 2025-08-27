import { Button } from "@mui/material";
import { useLogoutDialog } from "../../context/LogoutContext";
import CloseIcon from "@mui/icons-material/Close";

export default function TitleContent() {
  const { closeLogoutDialog } = useLogoutDialog();

  return (
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
  );
}
