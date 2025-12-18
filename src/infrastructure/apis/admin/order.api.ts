import { OrderType } from "@/application/schemas/order.schema";
import { api } from "@/infrastructure/axios/api.client";
import { CreateOrderFormType, UpdateOrderFormType } from "@/application/schemas/order.form.schema";
import { apiCallErrorHandler } from "@/infrastructure/error-handlers/apiCallErrorHandler";

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
    apiCallErrorHandler(error, "fetch orders");
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
    apiCallErrorHandler(error, "fetch order by ID");
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
    apiCallErrorHandler(error, "create order");
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
    apiCallErrorHandler(error, "update order");
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
    apiCallErrorHandler(error, "delete order");
  }
};
