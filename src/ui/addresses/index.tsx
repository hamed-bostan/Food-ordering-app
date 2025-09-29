"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import AddressSelector from "./AddressSelector";
import EmptyStateMessage from "@/presentation/components/EmptyStateMessage";
import UserAddresses from "./userAddresses";
import { updateUserProfile } from "@/infrastructure/apis/user.api";
import { useSession } from "next-auth/react";
import { AddressContext } from "@/context/address.context";
import { ContactInfo } from "@/types/userpanel.types";

export default function Addresses() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session?.accessToken || !session?.user?.id) {
    console.error("❌ Missing auth token or user ID");
    return <div>Unauthorized</div>;
  }

  const token = session.accessToken;
  const userId = session.user.id as string;
  const { value: addressValue, setValue, coords, resetAddress } = useContext(AddressContext)!;

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"location" | "addressForm">("location");
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load addresses from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("addressForm");
      if (saved) setContactInfo(JSON.parse(saved));
    }
  }, []);

  const handleOpenDialog = (goToForm: boolean = false, index: number | null = null) => {
    setOpen(true);
    setStep(goToForm ? "addressForm" : "location");
    setEditIndex(index);

    // Reset address context to defaults whenever dialog opens
    resetAddress();

    // If editing, preload context with existing address
    if (index !== null && contactInfo[index].address) {
      const existing = contactInfo[index];
      setValue(existing.address); // <-- if ContactInfo has `address`
      // coords? store coords if you saved them in ContactInfo
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setStep("location");
    setEditIndex(null);
  };
  const saveContactInfo = async (newContact: ContactInfo) => {
    // Update local state and localStorage
    const updated =
      editIndex !== null ? contactInfo.map((c, i) => (i === editIndex ? newContact : c)) : [...contactInfo, newContact];

    setContactInfo(updated);
    localStorage.setItem("addressForm", JSON.stringify(updated));

    // Save only address + location to MongoDB
    if (!token) {
      console.error("❌ Missing auth token");
    } else {
      try {
        await updateUserProfile(
          userId,
          {
            address: {
              value: addressValue || newContact.address,
              coords: coords,
            },
          },
          token
        );
      } catch (error) {
        console.error("❌ Failed to save address in DB:", error);
      }
    }

    handleCloseDialog();
  };

  const handleDelete = (index: number) => {
    const updated = contactInfo.filter((_, i) => i !== index);
    setContactInfo(updated);
    localStorage.setItem("addressForm", JSON.stringify(updated));
  };

  const handleEdit = (index: number) => {
    handleOpenDialog(true, index);
  };

  return (
    <div>
      {contactInfo.length === 0 ? (
        <EmptyStateMessage
          text="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!"
          button
          buttonText="افزودن آدرس"
          onClick={() => handleOpenDialog()}
        />
      ) : (
        <UserAddresses
          contactInfo={contactInfo}
          onOpenDialog={() => handleOpenDialog()}
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
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#EDEDED",
            p: 2,
          }}
        >
          <p className="text-sm md:text-base text-[#353535] select-none font-medium">
            {step === "location" ? "افزودن آدرس" : editIndex !== null ? "ویرایش آدرس" : "اضافه کردن جزییات"}
          </p>
          <Button onClick={handleCloseDialog} sx={{ color: "#717171" }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: step === "addressForm" ? "1.25rem" : 0,
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
