import { verifyPayment } from "@/infrastructure/paymentGateway";

export async function verifyPaymentUseCase(trackId: string) {
  const result = await verifyPayment(trackId);
  return result;
}
