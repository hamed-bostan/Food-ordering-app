"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import {
  storeAddress,
  updateAddress,
} from "@/shared/redux/address/addressSlice";
import { AddressContext } from "@/context/AddressContext";
import { useAddressDialog } from "@/context/AddressDialogContext";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/CustomButton";
import { Address, NewAddress } from "@/redux/reducers/types";

export default function AddressForm() {
  // Local state to hold title and phone number
  const [title, setTitle] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");

  // Access context
  const {
    selectedAddress,
    setSelectedAddress,
    editingAddress,
    setEditingAddress,
  } = useContext(AddressContext) || {};

  const { closeAddressDialog } = useAddressDialog();
  const dispatch = useDispatch();

  // Ensure correct typing for editingAddress
  const addressData = editingAddress as Address | null;

  useEffect(() => {
    if (addressData) {
      setTitle(addressData.title || "");
      setPhoneNumber(addressData.phoneNumber || "");
      setFamilyName(addressData.name || "");
      setSelectedAddress?.(addressData.address || ""); // Ensure function existence
    }
  }, [editingAddress, setSelectedAddress]);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title || !phoneNumber || !familyName) {
      console.error("Title, phone number, or family name is missing!");
      return;
    }

    if (addressData) {
      dispatch(
        updateAddress({
          id: addressData.id,
          title,
          phoneNumber,
          name: familyName,
          address: selectedAddress || "",
        })
      );
    } else {
      dispatch(
        storeAddress({
          title,
          phoneNumber,
          name: familyName,
          address: selectedAddress || "",
        } as NewAddress)
      );
    }

    closeAddressDialog();
    setEditingAddress?.(null);
  }

  function onCancel() {
    closeAddressDialog();
    setEditingAddress?.(null);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        label="عنوان آدرس"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        sx={{ mb: 3 }}
      />
      <div className="flex items-center mb-4 gap-x-1">
        <Checkbox
          size="small"
          id="term1"
          sx={{
            color: "#00BA88",
            "&.Mui-checked": {
              color: "#00BA88",
            },
            "&.MuiCheckbox-root": {
              padding: 0,
            },
          }}
        />
        <label htmlFor="term1" className="text-xs text-[#353535]">
          تحویل گیرنده خودم هستم.
        </label>
      </div>
      <Input
        label="نام و نام‌خانوادگی تحویل گیرنده"
        sx={{ mb: 3 }}
        value={familyName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFamilyName(e.target.value)
        }
      />
      <Input
        label="شماره همراه تحویل گیرنده"
        sx={{ mb: 3 }}
        value={phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhoneNumber(e.target.value)
        }
      />
      <Input
        label="آدرس دقیق شما"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSelectedAddress?.(e.target.value)
        }
        value={selectedAddress || ""}
        multiline
        rows={2}
      />
      <div className="flex justify-between mt-6 gap-x-4">
        <CustomButton
          onClick={onCancel}
          variant="outlined"
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            color: "#417F56",
            "&:hover": {
              backgroundColor: "#417F56",
              color: "#fff",
            },
            border: "none",
          }}
        >
          انصراف
        </CustomButton>
        <CustomButton type="submit" sx={{ width: "100%" }}>
          {editingAddress ? "ویرایش آدرس" : "ثبت آدرس"}
        </CustomButton>
      </div>
    </form>
  );
}
