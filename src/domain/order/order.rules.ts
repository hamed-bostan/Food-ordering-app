import { AddressType } from "@/application/schemas/address.schema";
import { BranchType, DeliveryMethodType } from "@/application/schemas/order.schema";

export function isOrderDeliveryValid(
  deliveryMethod: DeliveryMethodType,
  branch: BranchType | null | undefined,
  address: AddressType | null | undefined
): boolean {
  const b = branch ?? null;
  const a = address ?? null;

  if (deliveryMethod === "pickup") {
    return b !== null && a === null;
  }
  if (deliveryMethod === "courier") {
    return b === null && a !== null;
  }
  return false;
}

export function calculateOrderTotal(items: { price: number; discount?: number | null; quantity: number }[]): number {
  return items.reduce((total, item) => {
    const discount = Number(item.discount ?? 0);
    const discountedPrice = item.price - (item.price * discount) / 100;
    return total + discountedPrice * item.quantity;
  }, 0);
}

export function calculateTotalDiscount(items: { price: number; discount?: number | null; quantity: number }[]): number {
  return items.reduce((total, item) => {
    const discount = Number(item.discount ?? 0);
    return total + ((item.price * discount) / 100) * item.quantity;
  }, 0);
}
