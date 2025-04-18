"use client";

import MyAddresses from "@/components/userPanel/myAddresses";
import OrderDeliveryMethod from "./OrderDeliveryMethod";
import CartSummary from "../CartSummary";
import MoreInformation from "./MoreInformation";
import { useState } from "react";
import InPersonPickup from "./InPersonPickup";

export type OrderMethodType = "courier" | "pickup";

export default function OrderOverview() {
  const [selectedTab, setSelectedTab] = useState<OrderMethodType>("courier");

  return (
    <section className="md:grid md:grid-cols-[70fr_40fr] md:gap-x-4 lg:gap-x-6">
      <div>
        <OrderDeliveryMethod
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "courier" && <MyAddresses />}
        {selectedTab === "pickup" && <InPersonPickup />}
        <MoreInformation />
      </div>
      <CartSummary />
    </section>
  );
}
