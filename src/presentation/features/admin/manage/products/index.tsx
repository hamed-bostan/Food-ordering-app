"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { ProductType } from "@/application/schemas/product.schema";
import ProductRow from "./ProductRow";
import { useSession } from "next-auth/react";
import { ProductUpdateFormType } from "@/application/schemas/product.form.schema";


export default function ProductsTable({
  initialProducts,
  deleteAction,
  updateAction,
}: {
  initialProducts: ProductType[];
  deleteAction: (productId: string) => Promise<string>;
  updateAction: (productId: string, data: ProductUpdateFormType) => Promise<ProductType>;
}) {
  const session = useSession();
  const [products, setProducts] = useState<ProductType[]>(initialProducts);

  const updateProductInList = (updatedProduct: ProductType) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const handleProductRemoved = async (productId: string) => {
    const removedProduct = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId)); // Optimistic

    try {
      const message = await deleteAction(productId);
      toast.success(message);
    } catch (error: unknown) {
      if (removedProduct) {
        setProducts((prev) => [...prev, removedProduct].sort((a, b) => a.id.localeCompare(b.id))); // Rollback
      }
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to delete product");
    }
  };

 
  const handleUpdateRequest = async (productId: string, data: ProductUpdateFormType) => {
    const originalProduct = products.find((p) => p.id === productId);
    if (!originalProduct) return;

    // Optimistic: Merge without image (keep old string URL)
    const optimisticProduct = { ...originalProduct, ...data, image: originalProduct.image };
    updateProductInList(optimisticProduct);

    try {
      const updated = await updateAction(productId, data);
      updateProductInList(updated); // Sync with server (new image URL)
      toast.success("Product updated successfully");
    } catch (error: unknown) {
      updateProductInList(originalProduct); // Rollback
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to update product");
    }
  };

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Image</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Discount</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            userRole={session?.data?.user?.role ?? ""}
            product={product}
            onUpdateRequest={handleUpdateRequest}
            onProductRemoved={handleProductRemoved}
          />
        ))}
      </tbody>
    </table>
  );
}
