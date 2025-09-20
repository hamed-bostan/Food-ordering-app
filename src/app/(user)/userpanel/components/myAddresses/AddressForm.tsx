"use client";

import Checkbox from "@mui/material/Checkbox";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/CustomButton";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AddressContext } from "@/context/address.context";

type AddressFormProps = {
  onSaveContactInfo: (newAddress: { name: string; phone_number: string; address: string }) => void;
  onClose: () => void;
  defaultValues?: { name: string; phone_number: string; address: string };
};

export default function AddressForm({ onSaveContactInfo, onClose, defaultValues }: AddressFormProps) {
  const { value } = useContext(AddressContext)!;

  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    phone_number: defaultValues?.phone_number || "",
    address: defaultValues?.address || value || "",
  });

  // in case defaultValues change while dialog is open
  useEffect(() => {
    if (defaultValues) {
      setFormData({
        name: defaultValues.name,
        phone_number: defaultValues.phone_number,
        address: defaultValues.address,
      });
    }
  }, [defaultValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSaveContactInfo(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="عنوان آدرس" sx={{ mb: 3 }} />

      <div className="flex items-center mb-4 gap-x-1">
        <Checkbox
          size="small"
          id="term1"
          sx={{
            color: "#00BA88",
            "&.Mui-checked": { color: "#00BA88" },
            "&.MuiCheckbox-root": { padding: 0 },
          }}
        />
        <label htmlFor="term1" className="text-xs text-[#353535]">
          تحویل گیرنده خودم هستم.
        </label>
      </div>

      <Input
        label="نام و نام‌خانوادگی تحویل گیرنده"
        value={formData.name}
        name="name"
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      <Input
        label="شماره همراه تحویل گیرنده"
        value={formData.phone_number}
        name="phone_number"
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      <Input label="آدرس دقیق شما" multiline rows={2} value={formData.address} name="address" onChange={handleChange} />

      <div className="flex justify-between mt-6 gap-x-4">
        <CustomButton
          onClick={onClose}
          variant="outlined"
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            color: "#417F56",
            "&:hover": { backgroundColor: "#417F56", color: "#fff" },
            border: "none",
          }}
        >
          انصراف
        </CustomButton>
        <CustomButton type="submit" sx={{ width: "100%" }}>
          ثبت آدرس
        </CustomButton>
      </div>
    </form>
  );
}
