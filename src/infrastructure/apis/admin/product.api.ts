import { ProductType } from "@/application/schemas/product.schema";
import { api } from "@/infrastructure/axios/api.client";
import { apiCallErrorHandler } from "@/infrastructure/error-handlers/apiCallErrorHandler";
import { ProductCreateFormType, ProductUpdateFormType } from "@/application/schemas/product.form.schema";

export type GetProductsResponse = { message: string; result: ProductType[] };
export type GetProductByIdResponse = { message: string; result: ProductType };
export type CreateProductResponse = { message: string; result: ProductType };
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
    apiCallErrorHandler(error, "fetch products");
  }
};

// Get product by ID (admin)
export const getProductByIdAdmin = async (id: string, token: string): Promise<GetProductByIdResponse> => {
  try {
    const { data } = await api.get<GetProductByIdResponse>(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.result || typeof data.result !== "object") throw new Error("Invalid server response");
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "fetch product by ID");
  }
};

// Create product (admin)
export const createProductAdmin = async (
  token: string,
  payload: FormData | ProductCreateFormType
): Promise<CreateProductResponse> => {
  try {
    const { data } = await api.post<CreateProductResponse>(`/admin/products`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
    });
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "create product");
  }
};

// Update product (admin)
export const updateProductAdmin = async (
  productId: string,
  token: string,
  payload: FormData | ProductUpdateFormType
): Promise<UpdateProductResponse> => {
  try {
    const { data } = await api.put<UpdateProductResponse>(`/admin/products/${productId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
    });
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "update product");
  }
};

// Delete product (admin)
export const deleteProductAdmin = async (productId: string, token: string): Promise<DeleteProductResponse> => {
  try {
    const { data } = await api.delete<DeleteProductResponse>(`/admin/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "delete product");
  }
};
