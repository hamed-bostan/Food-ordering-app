import { ProductType } from "@/domain/product.schema";
import { api } from "@/infrastructure/axios/api.client";
import { ApiErrorResponse } from "@/types/api-error";
import axios from "axios";

export type GetProductsResponse = { message: string; result: ProductType[] };
export type CreateProductResponse = { message: string; result: ProductType };
export type GetProductByIdResponse = { message: string; result: ProductType };
export type UpdateProductResponse = { message: string; result: ProductType };
export type DeleteProductResponse = { message: string };

// Fetch all products (admin)
export const getProductsAdmin = async (token: string): Promise<GetProductsResponse> => {
  try {
    const { data } = await api.get<GetProductsResponse>("/admin/products", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!Array.isArray(data.result)) throw new Error("Invalid server response");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to fetch products (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while fetching products (admin)");
  }
};

// Create product (admin)
export const createProductAdmin = async (formData: FormData, token: string): Promise<CreateProductResponse> => {
  try {
    const { data } = await api.post<CreateProductResponse>("/admin/products", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    if (!data.result) throw new Error("Product creation failed");
    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to create product (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while creating product (admin)");
  }
};

// Get product by ID (admin)
export const getProductByIdAdmin = async (id: string, token: string): Promise<GetProductByIdResponse> => {
  try {
    const { data } = await api.get<GetProductByIdResponse>(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.result || typeof data.result !== "object") {
      throw new Error("Invalid server response");
    }

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to fetch product by ID (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while fetching product by ID (admin)");
  }
};

// Update product (admin)
export const updateProductAdmin = async (
  id: string,
  payload: Partial<ProductType> | FormData,
  token: string
): Promise<UpdateProductResponse> => {
  try {
    const isFormData = payload instanceof FormData;
    const { data } = await api.put<UpdateProductResponse>(`/admin/products/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
    });

    if (!data.result) throw new Error("Failed to update product");
    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to update product (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while updating product (admin)");
  }
};

// Delete product (admin)
export const deleteProductAdmin = async (id: string, token: string): Promise<DeleteProductResponse> => {
  try {
    const { data } = await api.delete<DeleteProductResponse>(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data?.message) throw new Error("Failed to delete product");
    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to delete product (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while deleting product (admin)");
  }
};
