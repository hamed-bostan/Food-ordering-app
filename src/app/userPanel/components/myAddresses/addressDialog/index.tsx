import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddressForm from "./AddressForm";
import { useAddressDialog } from "@/context/AddressDialogContext";
import { useContext } from "react";
import { AddressContext } from "@/context/AddressContext";

export default function AddressDialog() {
  const { isAddressDialogOpen, closeAddressDialog } = useAddressDialog();
  const addressContext = useContext(AddressContext);

  function onClose() {
    closeAddressDialog();
    if (addressContext) {
      addressContext.setEditingAddress(null);
    }
  }

  return (
    <Dialog
      open={isAddressDialogOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100vw", // Full viewport width
          margin: 0, // Remove default margins
          borderRadius: { xs: 0, md: 2 },
        },
      }}
    >
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#717171" }}>
          <CloseIcon />
        </Button>
      </DialogActions>
      <DialogContent>
        <AddressForm />
      </DialogContent>
    </Dialog>
  );
}
