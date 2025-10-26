import { OrderType } from "@/application/schemas/order.schema";
import { CreateOrderDtoType } from "@/application/dto/orders/order.dto";
import { insertOrderToDb } from "@/infrastructure/repositories/order.repository";

export async function createOrderUseCase(order: CreateOrderDtoType): Promise<OrderType> {
  const newOrder = { ...order, createdAt: new Date().toISOString() };
  const insertedId = await insertOrderToDb(newOrder);

  return { ...newOrder, id: insertedId.toString(), createdAt: new Date(newOrder.createdAt) };
}
