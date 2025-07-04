"use client";

import { startPayment } from "@/app/payment/action";
import { useTransition } from "react";

export default function Payment() {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      const result = await startPayment(91500000);
      if (result?.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        alert("Payment initiation failed.");
      }
    });
  };

  return (
    <div>
      <h1>Pay Now</h1>
      <button onClick={handlePayment} disabled={isPending}>
        {isPending ? "Redirecting..." : "Pay"}
      </button>
    </div>
  );
}
