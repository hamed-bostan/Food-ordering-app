"use client";

import Input from "@/presentation/components/Input";
import CustomButton from "@/presentation/components/CustomButton";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AddressContext } from "@/context/address.context";
import { AddressType } from "@/application/schemas/address.schema";

export type AddressFormProps = {
  onSaveContactInfo: (newAddress: AddressType) => void;
  onClose: () => void;
  defaultValues?: AddressType;
};

export default function AddressForm({ onSaveContactInfo, onClose, defaultValues }: AddressFormProps) {
  const { tempAddress } = useContext(AddressContext)!;

  const [formData, setFormData] = useState<AddressType>({
    id: defaultValues?.id || crypto.randomUUID(),
    value: defaultValues?.value || tempAddress?.value || "",
    coords: defaultValues?.coords || tempAddress?.coords || [0, 0],
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
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
      <Input label="بازبینی آدرس" multiline rows={2} value={formData.value} name="value" onChange={handleChange} />

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
