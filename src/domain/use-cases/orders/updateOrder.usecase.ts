import { updateOrderInDb } from "@/infrastructure/repositories/order.repository";
import { OrderType } from "@/application/schemas/order.schema";
import { UpdateOrderDtoType } from "@/application/dto/orders/order.dto";

export async function updateOrderUseCase(orderId: string, updatedFields: UpdateOrderDtoType): Promise<OrderType> {
  return await updateOrderInDb(orderId, updatedFields);
}
