"use client";

import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileSchema } from "@/schemas/profile-schema";
import useNumericField from "@/hooks/useNumericField";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";

type UserIdProps = {
  userId: string; // pass logged-in user's id here
};

export default function UserInformation({ userId }: UserIdProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useFormContext<ProfileSchema>();

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const phone = useNumericField("phone_number", 11, "09");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ProfileSchema) => {
      const res = await axios.post("/api/user/update", {
        userId,
        ...data,
      });
      return res.data; // axios stores the response data in `res.data`
    },
    onSuccess: (data) => {
      toast.success(data.message || "User updated");
      reset(); // Optional — see earlier note about whether you want to reset the form
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || "Failed to update user info";
      toast.error(message);
    },
  });

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file)); // show image preview
  }

  async function onSubmit(data: ProfileSchema) {
    const filtered: ProfileSchema = {};
    for (const key in data) {
      const value = data[key as keyof ProfileSchema];
      if (typeof value === "string" && value.trim()) {
        filtered[key as keyof ProfileSchema] = value;
      }
    }

    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("userId", userId);

      setUploading(true);
      try {
        const res = await axios.post("/api/upload-image", formData);
        const result = res.data;

        filtered.image = result.url;
        setValue("image", result.url);
        toast.success("تصویر با موفقیت آپلود شد");
      } catch (err: any) {
        const message = err?.response?.data?.error || "خطا در آپلود تصویر";
        toast.error(message);
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    mutation.mutate(filtered, {
      onSuccess: () => {
        setSelectedImage(null); // Clear the image file
        setPreview(null); // Clear the preview URL
      },
    });
  }

  const currentImage = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mb-5 gap-y-4 md:grid-cols-2 md:gap-x-4 md:mb-7 md:gap-y-5 min-h-36">
        <Input label="نام و نام خانوادگی" {...register("name")} />
        <Input
          label="شماره تماس"
          type="text"
          {...phone.registerProps}
          // value={phone.value}
          error={phone.error}
          helperText={phone.helperText}
          onChange={phone.onChange}
          onFocus={phone.onFocus}
          onBlur={phone.onBlur}
          borderColor={phone.borderColor}
          inputProps={phone.inputProps}
        />
        <Input
          label="ایمیل"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview || currentImage ? (
            <Image
              src={preview || currentImage || ""}
              alt="Profile preview"
              width={100}
              height={100}
              className="mt-2 rounded-full"
            />
          ) : null}
        </div>
      </div>
      <CustomButton
        type="submit"
        startIcon={<EditIcon />}
        variant="outlined"
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          mx: "auto",
          borderColor: "#417F56",
          color: "#417F56",
          "&:hover": { color: "#fff", backgroundColor: "#417F56" },
        }}
      >
        بروز رسانی اطلاعات شخصی
      </CustomButton>
    </form>
  );
}
