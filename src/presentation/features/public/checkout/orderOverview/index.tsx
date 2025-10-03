"use client";

import OrderDeliveryMethod from "./OrderDeliveryMethod";
import CartSummary from "../CartSummary";
import { useState } from "react";
import InPersonPickup from "./InPersonPickup";
import AdditionalOrderInfo from "./AdditionalOrderInfo";
import Address from "@/presentation/features/address";
import { DeliveryMethodType } from "@/application/schemas/order.schema";

export default function OrderOverview() {
  const [selectedTab, setSelectedTab] = useState<DeliveryMethodType>("courier");

  return (
    <section className="md:grid md:grid-cols-[70fr_40fr] md:gap-x-4 lg:gap-x-6">
      <div>
        <OrderDeliveryMethod selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === "courier" && <Address />}
        {selectedTab === "pickup" && <InPersonPickup />}
        <AdditionalOrderInfo />
      </div>
      <CartSummary />
    </section>
  );
}
