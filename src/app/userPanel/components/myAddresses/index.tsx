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

  const handleOpenDialog = () => {
    setIsOpen(true);
    setStep("location");
    setEditIndex(null);
    resetAddress();
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setStep("location");
    setEditIndex(null);
  };

  const saveContactInfo = (newAddress: ContactInfo) => {
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
    handleCloseDialog();
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

  return (
    <div>
      {contactInfo.length === 0 ? (
        <EmptyStateMessage
          text="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!"
          button={true}
          buttonText="افزودن آدرس"
          onClick={handleOpenDialog}
        />
      ) : (
        <UserAddresses
          contactInfo={contactInfo}
          onOpenDialog={handleOpenDialog}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <Dialog
        open={open}
        onClose={handleCloseDialog}
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
            <Button onClick={handleCloseDialog} sx={{ color: "#717171" }}>
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
              onSaveContactInfo={saveContactInfo}
              onClose={handleCloseDialog}
              defaultValues={editIndex !== null ? contactInfo[editIndex] : undefined}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
