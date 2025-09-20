"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { ProductType } from "@/domain/product.schema";
import { deleteProductAdmin } from "@/infrastructure/apis/admin/product.api";
import ProductsRow from "./ProductsRow";

export default function ProductsTable({ initialProducts, token }: { initialProducts: ProductType[]; token: string }) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);

  // Update a product in the table after editing
  const handleProductUpdated = (updatedProduct: ProductType) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  // Remove a product from the table after deletion
  const handleProductRemoved = async (productId: string) => {
    try {
      const res = await deleteProductAdmin(productId, token);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success(res.message);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to delete product");
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
          <ProductsRow
            key={product.id}
            product={product}
            token={token}
            onProductUpdated={handleProductUpdated}
            onProductRemoved={handleProductRemoved}
          />
        ))}
      </tbody>
    </table>
  );
}
