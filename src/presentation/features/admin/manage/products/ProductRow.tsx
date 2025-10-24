"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { ProductType } from "@/application/schemas/product.schema";
import { updateProductAdmin } from "@/infrastructure/apis/admin/product.api";
import { ProductUpdateFormSchema, ProductUpdateFormType } from "@/application/schemas/product.form.schema";

type ProductsRowProps = {
  product: ProductType;
  token: string;
  onProductUpdated: (product: ProductType) => void;
  onProductRemoved: (productId: string) => void;
};

export default function ProductRow({ product, token, onProductUpdated, onProductRemoved }: ProductsRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductUpdateFormType>({
    resolver: zodResolver(ProductUpdateFormSchema),
    defaultValues: {
      category: product.category,
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      score: product.score,
      filter: product.filter,
      mostsale: product.mostsale,
    },
  });

  const onSubmit = async (data: ProductUpdateFormType) => {
    try {
      // Separate image from other fields
      const { image, ...fields } = data;

      // Default payload is JSON (no image)
      let payload: Omit<ProductUpdateFormType, "image"> | FormData = fields;

      if (selectedImage) {
        const formData = new FormData();

        // Dynamically append all fields as strings
        Object.entries(fields).forEach(([key, value]) => {
          if (value !== undefined) formData.append(key, String(value));
        });

        // Append the selected image
        formData.append("image", selectedImage);
        payload = formData;
      }

      const updated = await updateProductAdmin(product.id, payload, token);

      onProductUpdated(updated.result);
      setIsEditing(false);
      setSelectedImage(null);
      reset();
      toast.success("Product updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to update product");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setSelectedImage(null);
  };

  return (
    <tr>
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) setSelectedImage(e.target.files[0]);
            }}
            className="w-full p-1 mx-auto border rounded"
          />
        ) : (
          <img src={product.image} alt={product.title} className="object-cover w-16 h-16 mx-auto rounded" />
        )}
      </td>

      {/* Title */}
      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("title")} className="w-full p-1 border rounded" />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </>
        ) : (
          product.title
        )}
      </td>

      {/* Price */}
      <td className="p-2 border">
        {isEditing ? (
          <>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="w-full p-1 border rounded"
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </>
        ) : (
          product.price.toLocaleString()
        )}
      </td>

      {/* Discount */}
      <td className="p-2 border">
        {isEditing ? (
          <>
            <input
              type="number"
              {...register("discount", { valueAsNumber: true })}
              className="w-full p-1 border rounded"
            />
            {errors.discount && <p className="text-sm text-red-500">{errors.discount.message}</p>}
          </>
        ) : (
          `${product.discount}%`
        )}
      </td>

      {/* Category */}
      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("category")} className="w-full p-1 border rounded" />
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </>
        ) : (
          product.category
        )}
      </td>

      {/* Actions */}
      <td className="p-2 border">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <button type="submit" disabled={isSubmitting} className="text-green-600">
              <SaveIcon fontSize="small" />
            </button>
            <button type="button" onClick={handleCancel} className="text-gray-600">
              <CloseIcon fontSize="small" />
            </button>
          </form>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-600">
              <EditIcon fontSize="small" />
            </button>
            <button onClick={() => onProductRemoved(product.id)} className="text-red-600">
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
