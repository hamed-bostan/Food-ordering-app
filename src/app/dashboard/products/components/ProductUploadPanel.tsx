"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Box, Typography, Button, Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import Input from "@/components/ui/Input";
import { createProduct } from "@/lib/api/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormType } from "@/lib/schemas/product-form.schema";

export const defaultProduct: Partial<ProductFormType> = {
  category: "پیتزاها",
  title: "عنوان",
  description: "توضیح",
  price: 10000,
  discount: 10,
  score: 1,
  filter: "پیتزاها",
  mostsale: false,
};

export default function ProductUploadPanel() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultProduct,
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (product) => {
      toast.success(`Product "${product.title}" uploaded!`);
      reset();
    },
    onError: (error: Error) => {
      // Rely on createProduct to format error messages
      toast.error(error.message || "Failed to upload product");
    },
  });

  const onSubmit = (data: ProductFormType) => {
    // Validate file type and size before sending
    const file = data.image[0];
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPEG or PNG images are allowed");
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("Image size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Single file
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
        بارگزاری محصولات
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
          label="امتیاز"
          type="number"
          error={!!errors.score}
          helperText={errors.score?.message}
          {...register("score", { valueAsNumber: true, required: "Score is required" })}
        />

        <Input
          label="عنوان"
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register("title", { required: "Title is required" })}
        />

        <Input
          label="توضیحات"
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register("description", { required: "Description is required" })}
        />

        <Input
          label="دسته بندی"
          error={!!errors.category}
          helperText={errors.category?.message}
          {...register("category", { required: "Category is required" })}
        />

        <Input
          label="قیمت"
          type="number"
          error={!!errors.price}
          helperText={errors.price?.message}
          {...register("price", {
            valueAsNumber: true,
            required: "Price is required",
            min: { value: 1, message: "Price must be at least 1" },
          })}
        />

        <Input label="تخفیف" type="number" {...register("discount", { valueAsNumber: true })} />

        <Input label="فیلتر" {...register("filter")} />

        <FormControlLabel control={<Checkbox {...register("mostsale")} />} label="پرفروشترین" />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </form>
    </Box>
  );
}
