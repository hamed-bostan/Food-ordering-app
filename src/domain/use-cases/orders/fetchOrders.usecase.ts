import { fetchOrdersFromDb } from "@/infrastructure/repositories/order.repository";
import { OrderType } from "@/application/schemas/order.schema";

export async function fetchOrdersUseCase(): Promise<OrderType[]> {
  return await fetchOrdersFromDb();
}
