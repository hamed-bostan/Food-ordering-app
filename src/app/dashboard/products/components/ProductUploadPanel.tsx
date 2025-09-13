"use client";

import { useForm } from "react-hook-form";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import Input from "@/components/ui/Input";
import { createProduct } from "@/lib/api/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormType } from "@/lib/schemas/product-form.schema";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const token = session?.accessToken;
  const userRole = session?.user?.role;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultProduct,
  });

  const onSubmit = async (data: ProductFormType) => {
    if (!token || userRole !== "admin") return toast.error("Unauthorized");

    const file = data.image[0];
    if (!file) return toast.error("Image is required");

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return toast.error("Only JPEG or PNG images are allowed");
    }
    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image size must be less than 5MB");
    }

    const formData = new FormData();
    formData.append("image", file);
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") formData.append(key, value.toString());
    });

    try {
      const product = await createProduct(formData, token);
      toast.success(`Product "${product.result.title}" uploaded!`);
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Unexpected error while uploading product");
    }
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
