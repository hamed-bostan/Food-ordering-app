"use client";

import AdditionalOrderInfo from "./AdditionalOrderInfo";
import Address from "@/presentation/features/address";
import DeliveryMethod from "./DeliveryMethod";
import PickupDelivery from "./PickupDelivery";
import { useOrderContext } from "@/context/OrderContext";

export default function OrderOverview() {
  const { deliveryMethod } = useOrderContext();
  return (
    <div>
      <DeliveryMethod />
      {deliveryMethod === "courier" && <Address />}
      {deliveryMethod === "pickup" && <PickupDelivery />}
      <AdditionalOrderInfo />
    </div>
  );
}
