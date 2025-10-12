import { AddressType } from "@/application/schemas/address.schema";
import { BranchType, DeliveryMethodType, PaymentMethodType } from "@/application/schemas/order.schema";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";

export function useOrderValidation() {
  function getOrderValidationError({
    deliveryMethod,
    paymentMethod,
    address,
    branch,
    selectedItems,
  }: {
    deliveryMethod: DeliveryMethodType;
    paymentMethod: PaymentMethodType;
    address: AddressType | null;
    branch: BranchType | null;
    selectedItems: any[];
  }): string | null {
    if (!deliveryMethod) return "روش تحویل را انتخاب کنید.";
    if (!paymentMethod) return "روش پرداخت را انتخاب کنید.";

    if (!isOrderDeliveryValid(deliveryMethod, branch, address)) {
      if (deliveryMethod === "pickup") return "لطفاً یک شعبه را انتخاب کنید.";
      if (deliveryMethod === "courier") return "لطفاً ابتدا یک آدرس جدید ایجاد کنید.";
    }

    if (!selectedItems.length) return "سبد خرید شما خالی است.";

    return null;
  }

  return { getOrderValidationError };
}
