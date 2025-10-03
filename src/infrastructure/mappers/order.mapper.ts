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
    items: doc.items,
    totalPrice: doc.totalPrice,
    createdAt: new Date(doc.createdAt),
  };
}
