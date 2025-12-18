import { OrderType } from "@/application/schemas/order.schema";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";

export async function fetchOrderByIdUseCase(orderId: string, repository: IOrderRepository): Promise<OrderType | null> {
  return await repository.fetchOrderById(orderId);
}
