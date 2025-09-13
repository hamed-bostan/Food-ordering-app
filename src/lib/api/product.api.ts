import { ProductType } from "../schemas/product.schema";
import api from "../axios";
import { ApiErrorResponse } from "@/types/api-error";
import axios from "axios";

export type GetProductsResponse = { message: string; result: ProductType[] };
export type CreateProductResponse = { message: string; result: ProductType };

// Fetch products
export const getProducts = async (): Promise<GetProductsResponse> => {
  try {
    const { data } = await api.get<GetProductsResponse>("/products");

    if (!Array.isArray(data.result)) throw new Error("Invalid server response");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to fetch products:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while fetching products");
  }
};

// Create a new product
export const createProduct = async (formData: FormData, token: string): Promise<CreateProductResponse> => {
  try {
    const { data } = await api.post<CreateProductResponse>("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!data.result) throw new Error("Product creation failed");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to create product:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while creating product");
  }
};
