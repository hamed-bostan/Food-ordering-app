"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import AddressSelector from "./AddressSelector";
import EmptyStateMessage from "@/presentation/components/EmptyStateMessage";
import UserAddresses from "./userAddresses";
import { getUserById, updateUserProfile } from "@/infrastructure/apis/user.api";
import { useSession } from "next-auth/react";
import { AddressContext } from "@/context/address.context";
import { AddressType } from "@/application/schemas/address.schema";

export default function Address() {
  const { data: session, status } = useSession();
  const { address, setAddress, resetAddress } = useContext(AddressContext)!;

  if (status === "loading") return <div>Loading...</div>;
  if (!session?.accessToken || !session?.user?.id) {
    console.error("❌ Missing auth token or user ID");
    return <div>Unauthorized</div>;
  }

  const token = session.accessToken;
  const userId = session.user.id as string;

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"location" | "addressForm">("location");
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const user = await getUserById(userId, token);
        setAddresses(user.result.address || []);
      } catch (error) {
        console.error("❌ Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId, token]);

  const handleOpenDialog = (goToForm: boolean = false, index: number | null = null) => {
    setOpen(true);
    setStep(goToForm ? "addressForm" : "location");
    setEditIndex(index);

    // Reset address context to defaults whenever dialog opens
    resetAddress();

    // If editing, preload context with existing address
    if (index !== null && addresses[index]) {
      setAddress(addresses[index]);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setStep("location");
    setEditIndex(null);
  };

  const saveAddress = async (newAddress: AddressType) => {
    // Update local state
    const updated =
      editIndex !== null ? addresses.map((c, i) => (i === editIndex ? newAddress : c)) : [...addresses, newAddress];

    setAddresses(updated);

    try {
      await updateUserProfile(
        userId,
        { address: updated }, // always store the full list
        token
      );
    } catch (error) {
      console.error("❌ Failed to save address in DB:", error);
    }

    handleCloseDialog();
  };

  const handleDelete = async (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);

    try {
      await updateUserProfile(userId, { address: updated }, token);
    } catch (error) {
      console.error("❌ Failed to delete address in DB:", error);
    }
  };

  const handleEdit = (index: number) => {
    handleOpenDialog(true, index);
  };

  return (
    <div>
      {addresses.length === 0 ? (
        <EmptyStateMessage
          text="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!"
          button
          buttonText="افزودن آدرس"
          onClick={() => handleOpenDialog()}
        />
      ) : (
        <UserAddresses
          addresses={addresses}
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
              onSaveContactInfo={saveAddress}
              onClose={handleCloseDialog}
              defaultValues={editIndex !== null ? addresses[editIndex] : undefined}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
