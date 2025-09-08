import { ApiErrorResponse } from "@/types/api-error";
import api from "../axios";
import { ProductType } from "../schemas/product.schema";
import { AxiosError } from "axios";

export const getProducts = async (): Promise<ProductType[]> => {
  const { data } = await api.get("/products");
  return data;
};

export async function createProduct(formData: FormData): Promise<ProductType> {
  try {
    const { data } = await api.post<ProductType>("/products", formData);
    return data;
  } catch (error) {
    console.error("❌ [API] Failed to create product:", error);
    if (error instanceof AxiosError) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      throw new Error(
        response?.error === "ValidationError"
          ? response.details?.map((e) => e.message).join(", ") || "Validation failed"
          : response?.message || "Failed to upload product"
      );
    }
    throw error; // Rethrow unexpected errors
  }
}
