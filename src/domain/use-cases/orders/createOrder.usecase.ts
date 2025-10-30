import { OrderType } from "@/application/schemas/order.schema";
import { CreateOrderDtoType } from "@/application/dto/orders/order.dto";
import { insertOrderToDb } from "@/infrastructure/repositories/order.repository";

export async function createOrderUseCase(order: CreateOrderDtoType): Promise<OrderType> {
  // Step 1: ensure required domain fields
  const newOrder: OrderType = {
    ...order,
    status: order.status ?? "تعیین وضعیت نشده",
    createdAt: new Date(),
    id: "",
  };

  // Step 2: map domain model to DB model
  const orderForDb = {
    ...newOrder,
    createdAt: newOrder.createdAt.toISOString(), // convert to string
  };

  // Step 3: insert into DB
  const insertedId = await insertOrderToDb(orderForDb);

  // Step 4: return full domain model
  return { ...newOrder, id: insertedId.toString() };
}
