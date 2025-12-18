import { OrderType } from "@/application/schemas/order.schema";
import {
  CreateOrderDtoType as OrderCreateInput,
  UpdateOrderDtoType as OrderUpdateInput,
} from "@/application/dto/orders/order.dto";

export interface IOrderRepository {
  insertOrder(order: OrderCreateInput): Promise<string>;
  fetchOrders(): Promise<OrderType[]>;
  fetchOrderById(id: string): Promise<OrderType | null>;
  updateOrder(id: string, update: OrderUpdateInput): Promise<OrderType>;
  deleteOrder(id: string): Promise<boolean>;
}
