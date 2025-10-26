import { CreateOrderDtoType } from "@/application/dto/orders/order.dto";

/**
 * DB insert type (MongoDB expects createdAt as string)
 */
export type OrderRecordInsert = Omit<CreateOrderDtoType, "id"> & {
  createdAt: string;
};

/**
 * DB update type (partial)
 */
export type OrderRecordUpdate = Partial<Omit<OrderRecordInsert, "id">>;
