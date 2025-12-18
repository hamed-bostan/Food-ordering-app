import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";

export async function deleteOrderUseCase(orderId: string, repository: IOrderRepository): Promise<boolean> {
  return await repository.deleteOrder(orderId);
}
