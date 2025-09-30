"use client";

import { startPayment } from "@/app/(public)/payment/action";
import { useTransition } from "react";

export default function PaymentButton({ amount }: { amount: number }) {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      // 1. Ask server to start payment
      const result = await startPayment(amount);

      // 2. UI concern → redirect to gateway
      if (result?.paymentUrl) {
        window.location.assign(result.paymentUrl); // assign is more explicit than href
      } else {
        alert("خطا در شروع پرداخت. لطفاً دوباره تلاش کنید.");
      }
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isPending}
      className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
    >
      {isPending ? "در حال انتقال..." : "پرداخت"}
    </button>
  );
}
