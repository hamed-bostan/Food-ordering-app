"use client";

import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import AddressForm from "./AddressForm";
import AddressSelector from "./AddressSelector";
import EmptyStateMessage from "@/presentation/components/EmptyStateMessage";
import UserAddresses from "./userAddresses";
import { useSession } from "next-auth/react";
import { AddressContext } from "@/context/address.context";
import { AddressType } from "@/application/schemas/address.schema";
import { useUserAddresses } from "@/hooks/useUserAddresses";
import { AddressService } from "@/application/services/address.service";
import { toast } from "react-toastify";
import { useOrderContext } from "@/context/OrderContext";
import { useAddressLogic } from "@/hooks/useAddressLogic";

export default function Address() {
  const { data: session } = useSession();
  const { address: selectedAddress, setAddress } = useOrderContext();
  const { addresses, setAddresses, isLoading, fetchAddresses } = useUserAddresses();
  const { setAddress: setSelectedAddress, resetAddress } = useContext(AddressContext)!;

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"location" | "addressForm">("location");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useAddressLogic(addresses, isLoading);

  if (isLoading) return <div>در حال بارگذاری آدرس‌ها...</div>;
  if (!session?.accessToken || !session.user?.id) return <div>Unauthorized</div>;

  const token = session.accessToken!;
  const userId = session.user.id;

  const handleOpenDialog = (goToForm = false, index: number | null = null) => {
    setOpen(true);
    setStep(goToForm ? "addressForm" : "location");
    setEditIndex(index);
    resetAddress();

    if (index !== null && addresses[index]) {
      setSelectedAddress(addresses[index]);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setStep("location");
    setEditIndex(null);
  };

  const saveAddress = async (newAddress: AddressType) => {
    const updated =
      editIndex !== null ? addresses.map((a, i) => (i === editIndex ? newAddress : a)) : [...addresses, newAddress];

    setAddresses(updated);

    try {
      await AddressService.save(userId, updated, token);
      toast.success("آدرس با موفقیت ذخیره شد.");

      // Fetch latest list to ensure sync with backend
      await fetchAddresses();

      // Automatically select the latest address
      setAddress(updated[updated.length - 1]);
    } catch (err) {
      console.error("❌ Failed to save address:", err);
      toast.error("خطا در ذخیره آدرس.");
    }

    handleCloseDialog();
  };

  const handleDelete = async (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);

    try {
      await AddressService.save(userId, updated, token);

      // Reset selected address if deleted one was active
      if (selectedAddress?.id === addresses[index]?.id) setAddress(null);

      toast.success("آدرس حذف شد.");

      await fetchAddresses();
    } catch (err) {
      console.error("❌ Failed to delete address:", err);
      toast.error("خطا در حذف آدرس.");
    }
  };

  const handleEdit = (index: number) => handleOpenDialog(true, index);

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
