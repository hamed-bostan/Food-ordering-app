import { CreateOrderDtoType, OrderType } from "@/application/schemas/order.schema";
import { insertOrderToDb } from "@/infrastructure/repositories/order.repository";

export async function submitOrderUseCase(order: CreateOrderDtoType): Promise<OrderType> {
  const newOrder = {
    ...order,
    createdAt: new Date().toISOString(),
  };

  const insertedId = await insertOrderToDb(newOrder);

  return { ...newOrder, id: insertedId.toString(), createdAt: new Date(newOrder.createdAt) };
}
