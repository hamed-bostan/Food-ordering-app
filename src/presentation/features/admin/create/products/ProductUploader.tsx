"use client";

import { useForm } from "react-hook-form";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import Input from "@/presentation/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCreateFormSchema, ProductCreateFormType } from "@/application/schemas/product.form.schema";
import { useState } from "react";
import { ProductType } from "@/application/schemas/product.schema";

export const defaultProduct: Partial<ProductCreateFormType> = {
  category: "پیتزاها",
  title: "عنوان",
  description: "توضیح",
  price: 10000,
  discount: 10,
  score: 1,
  filter: "پیتزاها",
  mostsale: false,
};

export default function ProductUploader({
  createAction,
}: {
  createAction: (data: ProductCreateFormType) => Promise<ProductType>;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductCreateFormType>({
    resolver: zodResolver(ProductCreateFormSchema),
    defaultValues: defaultProduct,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ProductCreateFormType) => {
    const file = selectedImage;

    if (!file) {
      toast.error("لطفا تصویر را انتخاب کنید");
      return;
    }

    const productData = { ...data, image: file };

    try {
      const createdProduct = await createAction(productData);
      toast.success(`Product "${createdProduct.title}" uploaded!`);
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
        <input type="file" accept="image/*" onChange={handleFileChange} />

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
