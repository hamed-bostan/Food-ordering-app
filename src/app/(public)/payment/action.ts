"use server";

import { startPayment as infraStartPayment } from "@/infrastructure/paymentGateway";

export async function startPayment(amount: number) {
  return await infraStartPayment(amount);
}
