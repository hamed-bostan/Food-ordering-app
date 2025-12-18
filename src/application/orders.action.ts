"use server"; // Server Actions file

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import { api } from "@/infrastructure/axios/api.client";
import { apiCallErrorHandler } from "@/infrastructure/error-handlers/apiCallErrorHandler";
import { UpdateOrderFormType } from "@/application/schemas/order.form.schema";

export async function deleteOrderAction(orderId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || (session.user.role !== "admin" && session.user.role !== "root")) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.delete(`/admin/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    revalidatePath("/manage/orders");
    return data.message || "Order deleted successfully";
  } catch (error: unknown) {
    apiCallErrorHandler(error, "delete order");
  }
}

export async function updateOrderAction(orderId: string, data: UpdateOrderFormType) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || (session.user.role !== "admin" && session.user.role !== "root")) {
    throw new Error("Unauthorized");
  }
  try {
    const { data: response } = await api.put(`/admin/orders/${orderId}`, data, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    revalidatePath("/manage/orders");
    return response.result; // Assuming returns updated order
  } catch (error: unknown) {
    apiCallErrorHandler(error, "update order");
  }
}
