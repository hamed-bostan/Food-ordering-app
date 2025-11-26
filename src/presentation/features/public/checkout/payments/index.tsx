"use client";

import DiscountCode from "./DiscountCode";
import PaymentMethod from "./PaymentMethod";
import OnlinePayment from "./OnlinePayment";
import CashPayment from "./CashPayment";
import { useOrderContext } from "@/context/OrderContext";

export default function Payments() {
  const { paymentMethod } = useOrderContext();
  return (
    <div>
      <DiscountCode />
      <PaymentMethod />
      {paymentMethod === "online" && <OnlinePayment />}
      {paymentMethod === "cash" && <CashPayment />}
    </div>
  );
}
