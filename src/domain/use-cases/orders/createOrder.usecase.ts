import { OrderType } from "@/application/schemas/order.schema";
import { CreateOrderDtoType as CreateOrderDto } from "@/application/dto/orders/order.dto";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";

export async function createOrderUseCase(data: CreateOrderDto, repository: IOrderRepository): Promise<OrderType> {
  const createdAt = new Date();
  const orderToInsert = {
    ...data,
    createdAt: createdAt.toISOString(),
  };

  const insertedId = await repository.insertOrder(orderToInsert);

  const order: OrderType = {
    ...data,
    id: insertedId,
    createdAt,
  };

  return order;
}
