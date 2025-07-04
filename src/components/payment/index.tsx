"use client";

import { startPayment } from "@/app/payment/action";

export default function PayButton() {
  const handlePayment = async () => {
    const res = await startPayment(10000);

    if (res?.paymentUrl) {
      window.location.href = res.paymentUrl;
    } else {
      alert("Payment initiation failed");
    }
  };

  return <button onClick={handlePayment}>Pay 10,000 Toman</button>;
}
