"use client";

import OrderDeliveryMethod from "./OrderDeliveryMethod";
import CartSummary from "../CartSummary";
import { useState } from "react";
import InPersonPickup from "./InPersonPickup";
import { OrderMethodType } from "@/types/order-method.types";
import AdditionalOrderInfo from "./AdditionalOrderInfo";
import Addresses from "@/ui/addresses";

export default function OrderOverview() {
  const [selectedTab, setSelectedTab] = useState<OrderMethodType>("courier");

  return (
    <section className="md:grid md:grid-cols-[70fr_40fr] md:gap-x-4 lg:gap-x-6">
      <div>
        <OrderDeliveryMethod selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === "courier" && <Addresses />}
        {selectedTab === "pickup" && <InPersonPickup />}
        <AdditionalOrderInfo />
      </div>
      <CartSummary />
    </section>
  );
}
