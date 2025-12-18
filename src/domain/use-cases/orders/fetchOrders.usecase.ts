import { OrderType } from "@/application/schemas/order.schema";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";

export async function fetchOrdersUseCase(repository: IOrderRepository): Promise<OrderType[]> {
  return await repository.fetchOrders();
}
