import { findOrderByIdInDb } from "@/infrastructure/repositories/order.repository";
import { OrderType } from "@/application/schemas/order.schema";

export async function fetchOrderByIdUseCase(orderId: string): Promise<OrderType | null> {
  return await findOrderByIdInDb(orderId);
}
