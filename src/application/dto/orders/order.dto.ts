import { z } from "zod";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";
import { BaseOrderSchema, orderDeliveryValidationError } from "@/application/schemas/order.schema";

// --- Create DTO (omit id + createdAt) ---
export const CreateOrderDtoSchema = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
}).refine((data) => isOrderDeliveryValid(data.deliveryMethod, data.branch, data.address), orderDeliveryValidationError);

// --- Update DTO (partial + conditional validation) ---
export const UpdateOrderDtoSchema = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
})
  .partial()
  .refine(
    (data) => data.deliveryMethod === undefined || isOrderDeliveryValid(data.deliveryMethod, data.branch, data.address),
    orderDeliveryValidationError
  );

// --- Types ---
export type CreateOrderDtoType = z.infer<typeof CreateOrderDtoSchema>;
export type UpdateOrderDtoType = z.infer<typeof UpdateOrderDtoSchema>;
