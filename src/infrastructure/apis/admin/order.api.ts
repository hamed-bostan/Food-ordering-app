import { ApiErrorResponse } from "@/types/api-error";
import axios from "axios";
import { OrderType } from "@/application/schemas/order.schema";
import { api } from "@/infrastructure/axios/api.client";
import { CreateOrderFormType, UpdateOrderFormType } from "@/application/schemas/order.form.schema";

// --- Response types ---
export type GetOrdersResponse = { message: string; result: OrderType[] };
export type CreateOrderResponse = { message: string; result: OrderType };
export type GetOrderByIdResponse = { message: string; result: OrderType };
export type UpdateOrderResponse = { message: string; result: OrderType };
export type DeleteOrderResponse = { message: string };

// --- Fetch all orders (admin) ---
export const getOrdersAdmin = async (token: string): Promise<GetOrdersResponse> => {
  try {
    const { data } = await api.get<GetOrdersResponse>("/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!Array.isArray(data.result)) throw new Error("Invalid server response");
    return data;
  } catch (error: unknown) {
    handleApiError(error, "fetch orders");
  }
};

// --- Fetch single order by ID ---
export const getOrderByIdAdmin = async (id: string, token: string): Promise<GetOrderByIdResponse> => {
  try {
    const { data } = await api.get<GetOrderByIdResponse>(`/admin/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.result || typeof data.result !== "object") throw new Error("Invalid server response");
    return data;
  } catch (error: unknown) {
    handleApiError(error, "fetch order by ID");
  }
};

// --- Create order (admin) ---
export const createOrderAdmin = async (payload: CreateOrderFormType, token: string): Promise<CreateOrderResponse> => {
  try {
    const { data } = await api.post<CreateOrderResponse>("/admin/orders", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.result) throw new Error("Order creation failed");
    return data;
  } catch (error: unknown) {
    handleApiError(error, "create order");
  }
};

// --- Update order (admin) ---
export const updateOrderAdmin = async (
  id: string,
  payload: UpdateOrderFormType,
  token: string
): Promise<UpdateOrderResponse> => {
  try {
    const { data } = await api.put<UpdateOrderResponse>(`/admin/orders/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.result) throw new Error("Failed to update order");
    return data;
  } catch (error: unknown) {
    handleApiError(error, "update order");
  }
};

// --- Delete order (admin) ---
export const deleteOrderAdmin = async (id: string, token: string): Promise<DeleteOrderResponse> => {
  try {
    const { data } = await api.delete<DeleteOrderResponse>(`/admin/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data?.message) throw new Error("Failed to delete order");
    return data;
  } catch (error: unknown) {
    handleApiError(error, "delete order");
  }
};

// --- Shared API error handler ---
function handleApiError(error: unknown, action: string): never {
  console.error(`❌ [API] Failed to ${action}:`, error);
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    if (response?.error === "ValidationError" && response.details?.length) {
      throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
    }
    if (response?.error === "ServerError" || response?.error === "NotFound") {
      throw new Error(response.message);
    }
  }
  throw new Error(`Unexpected error while trying to ${action}`);
}
