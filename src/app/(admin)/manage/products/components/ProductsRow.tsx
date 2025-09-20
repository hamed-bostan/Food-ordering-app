"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import { ProductType } from "@/domain/product.schema";
import { productFormSchema, ProductFormType } from "@/domain/product-form.schema";
import { updateProductAdmin } from "@/infrastructure/apis/admin/product.api";

type ProductsRowProps = {
  product: ProductType;
  token: string;
  onProductUpdated: (product: ProductType) => void;
  onProductRemoved: (productId: string) => void;
};

export default function ProductsRow({ product, token, onProductUpdated, onProductRemoved }: ProductsRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
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

  const onSubmit = async (data: ProductFormType) => {
    try {
      const payload = {
        category: data.category,
        title: data.title,
        description: data.description,
        price: data.price,
        discount: data.discount,
        score: data.score,
        filter: data.filter,
        mostsale: data.mostsale,
      };

      const updated = await updateProductAdmin(product.id, payload, token);
      onProductUpdated(updated.result);
      setIsEditing(false);
      toast.success("Product updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to update product");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <tr>
      {/* Image */}
      <td className="p-2 text-center border">
        <img src={product.image} alt={product.title} className="object-cover w-16 h-16 mx-auto rounded" />
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
