"use client";

import { useTransition } from "react";
import { startPayment } from "../payment/action";

export default function PaysPage() {
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
