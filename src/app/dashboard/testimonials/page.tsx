"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import Input from "@/components/ui/Input"; // assuming you have a custom Input
import { testimonialFormSchema, TestimonialFormType } from "@/app/branch/lib/testimonial-form.schema";
import { createTestimonial } from "@/lib/api/testimonial";
import { toast } from "react-toastify";

export const defaultTestimonial: Partial<TestimonialFormType> = {
  name: "محمد محمدی",
  date: "۱۴۰۳/۰۶/۰۱",
  comment: "نظر شما در مورد تجربه خودتان...",
};

export default function TestimonialUploadPanel() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormType>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: defaultTestimonial,
  });

  const mutation = useMutation({
    mutationFn: createTestimonial,
    onSuccess: (testimonial) => {
      toast.success(`Testimonial from "${testimonial.name}" uploaded!`);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload testimonial");
    },
  });

  const onSubmit = (data: TestimonialFormType) => {
    const file = data.image[0];

    const formData = new FormData();
    formData.append("image", file);
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value.toString());
      }
    });

    mutation.mutate(formData);
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
          disabled={isSubmitting || mutation.isPending}
          className="px-4 py-2 text-white bg-blue-600 rounded-xl disabled:opacity-50"
        >
          {mutation.isPending ? "در حال بارگذاری..." : "ثبت نظر"}
        </button>
      </form>
    </Box>
  );
}
