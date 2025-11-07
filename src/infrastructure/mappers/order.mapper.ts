import { OrderType } from "@/application/schemas/order.schema";

/**
 * Map MongoDB document to OrderType
 */

export function mapDbOrderToDomain(doc: any): OrderType {
  return {
    id: doc._id.toString(),
    branch: doc.branch,
    deliveryMethod: doc.deliveryMethod,
    paymentMethod: doc.paymentMethod,
    status: doc.status ?? "تعیین وضعیت نشده",
    address: doc.address,
    notes: doc.notes,
    items: doc.items,
    totalPrice: doc.totalPrice,
    createdAt: doc.createdAt,
  };
}
