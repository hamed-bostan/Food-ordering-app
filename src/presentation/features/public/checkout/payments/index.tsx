"use client";

import { useState } from "react";
import CartSummary from "../CartSummary";
import DiscountCode from "./DiscountCode";
import PaymentMethod from "./PaymentMethod";
import OnlinePayment from "./OnlinePayment";
import PayOnDelivery from "./PayOnDelivery";
import { PaymentMethodType } from "@/application/schemas/order.schema";

export default function Payments() {
  const [selectedTab, setSelectedTab] = useState<PaymentMethodType>("online");

  return (
    <section className="md:grid md:grid-cols-[70fr_40fr] md:gap-x-4 lg:gap-x-6">
      <div>
        <DiscountCode />
        <PaymentMethod selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === "online" && <OnlinePayment />}
        {selectedTab === "cash" && <PayOnDelivery />}
      </div>
      <CartSummary />
    </section>
  );
}
