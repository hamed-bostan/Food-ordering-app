import { useOrderValidation } from "@/hooks/useOrderValidation";
import { toast } from "react-toastify";
import {
  BranchType,
  CreateOrderDtoType,
  DeliveryMethodType,
  PaymentMethodType,
} from "@/application/schemas/order.schema";
import { AddressType } from "@/application/schemas/address.schema";
import axios from "axios";
import { api } from "@/infrastructure/axios/api.client";
import { calculateOrderTotal } from "@/domain/order/order.rules";

/**
 * Handles order submission with validation and DTO creation.
 * Keeps UI thin and separates business logic.
 */
export function useOrderSubmit() {
  const { getOrderValidationError } = useOrderValidation();

  async function submitOrder({
    deliveryMethod,
    paymentMethod,
    address,
    branch,
    notes,
    selectedItems,
    addresses,
  }: {
    deliveryMethod: DeliveryMethodType;
    paymentMethod: PaymentMethodType;
    address: AddressType | null;
    branch: BranchType | null;
    notes: string | null;
    selectedItems: any[];
    addresses: AddressType[];
  }) {
    // Step 1: Validation
    const error = getOrderValidationError({ deliveryMethod, paymentMethod, address, branch, selectedItems });
    if (error) {
      toast.info(error);
      return;
    }

    // Step 2: Build DTO (pure business logic)
    const orderPayload: CreateOrderDtoType = {
      branch,
      deliveryMethod,
      paymentMethod,
      address,
      notes,
      items: selectedItems.map((item) => ({
        productId: item.id,
        name: item.title,
        quantity: item.quantity,
        price: item.price,
        discount: Number(item.discount ?? 0),
      })),
      totalPrice: calculateOrderTotal(selectedItems),
    };

    // Step 3: API call (infrastructure boundary)
    try {
      const { data } = await api.post("/orders", orderPayload);
      console.log("Order created:", data);
      toast.success("سفارش شما با موفقیت ثبت شد.");
      return data.result;
    } catch (err: unknown) {
      console.error("❌ Order submission error:", err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "خطا در ثبت سفارش.");
      } else {
        toast.error("خطا در ثبت سفارش.");
      }
    }
  }

  return { submitOrder };
}
