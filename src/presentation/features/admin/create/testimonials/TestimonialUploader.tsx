"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import Input from "@/presentation/components/Input";
import { toast } from "react-toastify";
import { createTestimonialAdmin } from "@/infrastructure/apis/admin/testimonial.api";
import { CreateTestimonialFormType, CreateTestimonialFormSchema } from "@/application/schemas/testimonial.form.schema";

type Props = {
  accessToken: string;
};

// Default form values
export const defaultTestimonial: Partial<CreateTestimonialFormType> = {
  name: "محمد محمدی",
  date: "۱۴۰۳/۰۶/۰۱",
  comment: "نظر شما در مورد تجربه خودتان...",
};

export default function TestimonialUploader({ accessToken }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTestimonialFormType>({
    resolver: zodResolver(CreateTestimonialFormSchema),
    defaultValues: defaultTestimonial,
  });

  const onSubmit = async (data: CreateTestimonialFormType) => {
    const fileList = data.image; // currently FileList
    const file = fileList[0]; // pick the first file

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
        <Input
          label="تصویر"
          type="file"
          {...register("image")}
          error={!!errors.image}
          helperText={errors.image?.message as string}
        />

        <Input
          label="نام"
          type="text"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message as string}
        />

        <Input
          label="تاریخ"
          type="text"
          {...register("date")}
          error={!!errors.date}
          helperText={errors.date?.message as string}
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
