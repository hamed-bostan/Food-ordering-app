"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import Input from "@/presentation/components/Input";
import { toast } from "react-toastify";
import { createTestimonialAdmin } from "@/infrastructure/apis/admin/testimonial.api";
import { TestimonialCreateFormSchema, TestimonialCreateFormType } from "@/application/schemas/testimonial.form.schema";
import { useState } from "react";

type Props = {
  accessToken: string;
};

// Default form values
export const defaultTestimonial: Partial<TestimonialCreateFormType> = {
  name: "محمد محمدی",
  comment: "نظر شما در مورد تجربه خودتان...",
};

export default function TestimonialUploader({ accessToken }: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialCreateFormType>({
    resolver: zodResolver(TestimonialCreateFormSchema),
    defaultValues: defaultTestimonial,
  });

  // <-- handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]); // selectedImage: File | null
    }
  };

  const onSubmit = async (data: TestimonialCreateFormType) => {
    const file = selectedImage; // use the state instead of data.image

    if (!file) {
      toast.error("لطفا تصویر را انتخاب کنید");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // append single File
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image" && value != null) {
        formData.append(key, value.toString());
      }
    });

    try {
      const testimonial = await createTestimonialAdmin(formData, accessToken);
      toast.success(`نظر "${testimonial.result.name}" با موفقیت ثبت شد!`);
      reset();
      setSelectedImage(null); // reset file after submission
    } catch (error: unknown) {
      console.error("❌ [TestimonialUploadPanel] onSubmit error:", error);
      if (error instanceof Error) toast.error(error.message || "خطا در ثبت نظر");
      else toast.error("خطای ناشناخته هنگام ثبت نظر رخ داد");
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        بارگزاری نظر کاربران
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <Input
          label="نام"
          type="text"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message as string}
        />

        <Input
          label="نظر"
          type="text"
          multiline
          rows={3}
          {...register("comment")}
          error={!!errors.comment}
          helperText={errors.comment?.message as string}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-blue-600 rounded-xl disabled:opacity-50"
        >
          {isSubmitting ? "در حال بارگذاری..." : "ثبت نظر"}
        </button>
      </form>
    </Box>
  );
}
