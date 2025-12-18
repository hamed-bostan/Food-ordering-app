import { ValidationError } from "@/domain/errors";
import { OrderType } from "@/application/schemas/order.schema";
import { UpdateOrderDtoType as UpdateOrderDto } from "@/application/dto/orders/order.dto";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";

export async function updateOrderUseCase(
  orderId: string,
  fields: UpdateOrderDto,
  repository: IOrderRepository
): Promise<OrderType> {
  const existing = await repository.fetchOrderById(orderId);
  if (!existing) throw new ValidationError("Order not found");

  const dbUpdate = { ...fields };

  const updated = await repository.updateOrder(orderId, dbUpdate);

  return updated;
}
