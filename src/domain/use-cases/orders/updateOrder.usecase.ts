import { findOrderByIdInDb, updateOrderInDb } from "@/infrastructure/repositories/order.repository";
import { OrderType } from "@/application/schemas/order.schema";
import { UpdateOrderDtoType } from "@/application/dto/orders/order.dto";
import { ValidationError } from "@/domain/errors";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";

export async function updateOrderUseCase(orderId: string, updatedFields: UpdateOrderDtoType): Promise<OrderType> {
  // Step 1: Fetch existing order
  const existingOrder = await findOrderByIdInDb(orderId);
  if (!existingOrder) throw new ValidationError("Order not found");

  // Step 2: Domain validation
  // For example: ensure courier orders have an address
  const nextDeliveryMethod = updatedFields.deliveryMethod ?? existingOrder.deliveryMethod;
  const nextBranch = updatedFields.branch ?? existingOrder.branch;
  const nextAddress = updatedFields.address ?? existingOrder.address;

  if (!isOrderDeliveryValid(nextDeliveryMethod, nextBranch, nextAddress)) {
    throw new ValidationError("Invalid delivery configuration");
  }

  // Prevent updating shipped or cancelled orders, for instance:
  if (["ارسال شده", "لغو شده"].includes(existingOrder.status)) {
    throw new ValidationError("Cannot update a finalized order");
  }

  // Step 3: Build the final update payload
  const dbUpdate = {
    ...existingOrder,
    ...updatedFields,
  };

  // Step 4: Persist changes
  const updatedOrder = await updateOrderInDb(orderId, dbUpdate);

  // Step 5: Return the updated domain entity
  return updatedOrder;
}
