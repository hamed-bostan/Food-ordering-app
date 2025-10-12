"use client";

import CartSummary from "../CartSummary";
import AdditionalOrderInfo from "./AdditionalOrderInfo";
import Address from "@/presentation/features/address";
import DeliveryMethod from "./DeliveryMethod";
import PickupDelivery from "./PickupDelivery";
import { useOrderContext } from "@/context/OrderContext";

export default function OrderOverview() {
  const { deliveryMethod } = useOrderContext();

  return (
    <section className="md:grid md:grid-cols-[70fr_40fr] md:gap-x-4 lg:gap-x-6">
      <div>
        <DeliveryMethod />
        {deliveryMethod === "courier" && <Address />}
        {deliveryMethod === "pickup" && <PickupDelivery />}
        <AdditionalOrderInfo />
      </div>
      <CartSummary />
    </section>
  );
}
