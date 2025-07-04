import SuccessfulPayment from "@/components/payment/status/SuccessfulPayment";
import { verifyPayment } from "./action";
import UnsuccessfulPayment from "@/components/payment/status/UnsuccessfulPayment";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: { trackId?: string };
}) {
  if (!searchParams.trackId) {
    return <p>Invalid payment session</p>;
  }

  const status = await verifyPayment(searchParams.trackId);

  return (
    <>{status.success ? <SuccessfulPayment /> : <UnsuccessfulPayment />}</>
  );
}
