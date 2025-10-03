import { ApiErrorResponse } from "@/types/api-error";
import axios from "axios";
import { api } from "../axios/api.client";
import { OrderType } from "@/application/schemas/order.schema";

export type GetOrdersResponse = { message: string; result: OrderType[] };
export type CreateOrderResponse = { message: string; result: OrderType };

// ✅ Fetch all orders
export const getOrders = async (): Promise<GetOrdersResponse> => {
  try {
    const { data } = await api.get<GetOrdersResponse>("/orders");

    if (!Array.isArray(data.result)) {
      throw new Error("Invalid server response");
    }

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to fetch orders:", error);

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

    throw new Error("Unexpected error while fetching orders");
  }
};

// ✅ Create a new order
export const createOrder = async (
  orderData: Omit<OrderType, "id" | "createdAt" | "totalPrice">,
  token?: string
): Promise<CreateOrderResponse> => {
  try {
    const { data } = await api.post<CreateOrderResponse>("/orders", orderData, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!data.result) throw new Error("Order creation failed");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to create order:", error);

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

    throw new Error("Unexpected error while creating order");
  }
};
