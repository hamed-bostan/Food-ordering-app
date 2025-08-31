"use client";

import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import AddressForm from "./AddressForm";
import EmptyStateMessage from "@/components/shared/EmptyStateMessage";
import UserAddresses from "./userAddresses";
import AddressSelector from "./AddressSelector";
import { AddressContext } from "./context/addressContext";

type ContactInfo = {
  name: string;
  phone_number: string;
  address: string;
};

export default function MyAddresses() {
  const { resetAddress } = useContext(AddressContext)!;
  const [open, setIsOpen] = useState(false);
  const [step, setStep] = useState<"location" | "addressForm">("location");
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("addressForm") || "[]");
    }
    return [];
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    setStep("location");
    setEditIndex(null);
  };

  const saveAddress = (newAddress: ContactInfo) => {
    let updated: ContactInfo[];
    if (editIndex !== null) {
      // ✏️ Edit mode
      updated = [...contactInfo];
      updated[editIndex] = newAddress;
    } else {
      // ➕ Add mode
      updated = [...contactInfo, newAddress];
    }
    setContactInfo(updated);
    localStorage.setItem("addressForm", JSON.stringify(updated));
    handleClose();
  };

  const handleDelete = (index: number) => {
    const updated = contactInfo.filter((_, i) => i !== index);
    setContactInfo(updated);
    localStorage.setItem("addressForm", JSON.stringify(updated));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setIsOpen(true);
    setStep("addressForm"); // directly go to form
  };

  const handleOpen = () => {
    setIsOpen(true);
    setStep("location");
    setEditIndex(null);
    resetAddress(); // reset location/address whenever opening the dialog for a new address
  };

  return (
    <div>
      {contactInfo.length === 0 ? (
        <EmptyStateMessage
          text="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!"
          button={true}
          buttonText="افزودن آدرس"
          onClick={handleOpen}
        />
      ) : (
        <UserAddresses
          contactInfo={contactInfo}
          handleClick={handleOpen}
          onDelete={handleDelete} // pass down
          onEdit={handleEdit} // pass down
        />
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            margin: 0,
            borderRadius: { xs: 0, md: 2 },
          },
        }}
      >
        <div className="bg-[#EDEDED] flex justify-between">
          <DialogTitle
            sx={{
              padding: { xs: 2 },
            }}
          >
            <p className="text-sm md:text-base text-[#353535] select-none font-medium">
              {step === "location" ? "افزودن آدرس" : editIndex !== null ? "ویرایش آدرس" : "اضافه کردن جزییات"}
            </p>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "#717171" }}>
              <CloseIcon />
            </Button>
          </DialogActions>
        </div>
        <DialogContent
          sx={{
            padding: step === "addressForm" ? "1.25rem" : "0",
            width: "100%",
          }}
        >
          {step === "location" ? (
            <AddressSelector onSubmitLocation={() => setStep("addressForm")} />
          ) : (
            <AddressForm
              onSaveAddress={saveAddress}
              onClose={handleClose}
              defaultValues={editIndex !== null ? contactInfo[editIndex] : undefined}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
