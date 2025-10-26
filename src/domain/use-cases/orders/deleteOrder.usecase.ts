import { deleteOrderFromDb } from "@/infrastructure/repositories/order.repository";

export async function deleteOrderUseCase(orderId: string): Promise<void> {
  await deleteOrderFromDb(orderId);
}
