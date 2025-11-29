"use client";

import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, useEffect } from "react"; // Added useEffect
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

export default function Address({ initialAddresses = [] }: { initialAddresses?: AddressType[] }) {
  const { data: session } = useSession();
  const { selectedAddress, setSelectedAddress } = useOrderContext();
  const { addresses, setAddresses, isLoading, fetchAddresses } = useUserAddresses(initialAddresses);
  const { setTempAddress, resetTempAddress } = useContext(AddressContext)!;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"location" | "addressForm">("location");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  useAddressLogic(addresses, isLoading);
  useEffect(() => {
    if (selectedAddress) {
      setIsEditing(false);
    }
  }, [selectedAddress]);
  if (isLoading) return <div>در حال بارگذاری آدرس‌ها...</div>;
  if (!session?.accessToken || !session.user?.id) return <div>Unauthorized</div>;
  const token = session.accessToken!;
  const userId = session.user.id;
  const handleOpenDialog = (goToForm = false, index: number | null = null) => {
    setOpen(true);
    setStep(goToForm ? "addressForm" : "location");
    setEditIndex(index);
    resetTempAddress();
    if (index !== null && addresses[index]) {
      setTempAddress(addresses[index]);
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
      await fetchAddresses();
      setSelectedAddress(updated[editIndex !== null ? editIndex : updated.length - 1]);
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
      if (selectedAddress?.id === addresses[index]?.id) setSelectedAddress(null);
      toast.success("آدرس حذف شد.");
      await fetchAddresses();
    } catch (err) {
      console.error("❌ Failed to delete address:", err);
      toast.error("خطا در حذف آدرس.");
    }
  };
  const handleEdit = (index: number) => handleOpenDialog(true, index);
  const handleChange = () => {
    setIsEditing(true);
  };
  return (
    <div>
      {selectedAddress && !isEditing ? (
        <div className="bg-[#F9F9F9] rounded-md p-4 text-xs text-[#717171] border-2 border-[#417F56]">
          <p className="text-[#353535] font-medium mb-2">آدرس انتخاب‌شده:</p>
          <p className="text-[#353535]">{selectedAddress.value}</p>
          <Button
            onClick={handleChange}
            variant="outlined"
            sx={{
              mt: 2,
              color: "#417F56",
              borderColor: "#417F56",
              "&:hover": { backgroundColor: "#417F561A" },
            }}
          >
            تغییر آدرس
          </Button>
        </div>
      ) : addresses.length === 0 ? (
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
