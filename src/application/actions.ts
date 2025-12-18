"use server"; // Server Actions file

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { ProductCreateFormType, ProductUpdateFormType } from "@/application/schemas/product.form.schema"; // Adjust
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import { createProductAdmin, updateProductAdmin, deleteProductAdmin } from "@/infrastructure/apis/admin/product.api";

export async function deleteProductAction(productId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || (session.user.role !== "admin" && session.user.role !== "root")) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await deleteProductAdmin(productId, session.accessToken);
    revalidatePath("/manage/products");
    return response.message || "Product deleted successfully";
  } catch (error: unknown) {
    // apiCallErrorHandler is already in the API function; add action-specific handling if needed
    throw error;
  }
}

export async function updateProductAction(productId: string, data: ProductUpdateFormType) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || session.user.role !== "root") {
    throw new Error("Unauthorized");
  }
  try {
    let payload: FormData | ProductUpdateFormType = data;
    if (data.image instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image" && value !== undefined) formData.append(key, String(value));
      });
      formData.append("image", data.image);
      payload = formData;
    }

    const response = await updateProductAdmin(productId, session.accessToken, payload);
    revalidatePath("/manage/products");
    return response.result; // Assuming returns updated product
  } catch (error: unknown) {
    // apiCallErrorHandler is already in the API function; add action-specific handling if needed
    throw error;
  }
}

export async function createProductAction(data: ProductCreateFormType) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || (session.user.role !== "admin" && session.user.role !== "root")) {
    throw new Error("Unauthorized");
  }
  try {
    let payload: FormData | ProductCreateFormType = data;
    if (data.image instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image" && value !== undefined) formData.append(key, String(value));
      });
      formData.append("image", data.image);
      payload = formData;
    }

    const response = await createProductAdmin(session.accessToken, payload);
    revalidatePath("/manage/products");
    return response.result; // Assuming returns created product
  } catch (error: unknown) {
    // apiCallErrorHandler is already in the API function; add action-specific handling if needed
    throw error;
  }
}
