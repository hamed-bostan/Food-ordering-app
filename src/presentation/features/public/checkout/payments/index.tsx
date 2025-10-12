"use client";

import CartSummary from "../CartSummary";
import DiscountCode from "./DiscountCode";
import PaymentMethod from "./PaymentMethod";
import OnlinePayment from "./OnlinePayment";
import CashPayment from "./CashPayment";
import { useOrderContext } from "@/context/OrderContext";

export default function Payments() {
  const { paymentMethod } = useOrderContext();

  return (
    <section className="md:grid md:grid-cols-[70fr_40fr] md:gap-x-4 lg:gap-x-6">
      <div>
        <DiscountCode />
        <PaymentMethod />
        {paymentMethod === "online" && <OnlinePayment />}
        {paymentMethod === "cash" && <CashPayment />}
      </div>
      <CartSummary />
    </section>
  );
}
