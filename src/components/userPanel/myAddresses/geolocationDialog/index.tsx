import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddressRetrieval from "./AddressRetrieval";
import { useAddressDialog } from "@/context/AddressDialogContext";

export function GeolocationDialog() {
  const { isGeolocationDialogOpen, closeGeolocationDialog } =
    useAddressDialog(); // Access the context values

  return (
    <Dialog
      open={isGeolocationDialogOpen}
      onClose={closeGeolocationDialog}
      sx={{
        "& .MuiDialog-paper": {
          width: "100vw", // Full viewport width
          margin: 0, // Remove default margins
          padding: 0,
          height: "26rem",
          borderRadius: { xs: 0, md: 2 },
        },
      }}
    >
      <div className="bg-[#EDEDED] flex justify-between">
        <DialogTitle
          sx={{
            padding: { xs: 1, md: 2 },
          }}
        >
          <span className="text-sm md:text-base text-[#353535]">
            افزودن آدرس
          </span>
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeGeolocationDialog} sx={{ color: "#717171" }}>
            <CloseIcon />
          </Button>
        </DialogActions>
      </div>
      <DialogContent sx={{ padding: 0 }}>
        <AddressRetrieval />
      </DialogContent>
    </Dialog>
  );
}
