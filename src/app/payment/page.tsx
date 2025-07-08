import { verifyPayment } from "./action";
import successfulPaymentImage from "@/assets/images/icons/successful-payment.png";
import unsuccessfulPaymentImage from "@/assets/images/icons/unsuccessful-payment.png";
import PaymentMessage from "@/components/payment/PaymentMessage";

type PaymentPage = {
  searchParams: {
    trackId?: string;
  };
};

export default async function PaymentPage({ searchParams }: PaymentPage) {
  if (!searchParams.trackId) {
    return <p>Invalid payment session</p>;
  }

  const status = await verifyPayment(searchParams.trackId);

  return (
    <>
      {status.success ? (
        <PaymentMessage
          image={successfulPaymentImage}
          mainText="پرداخت شما با موفقیت انجام شد!"
          secondaryText="کد رهگیری سفارش شما: ۲۱۵۴۹۰۱۹"
          secondButtonText="پیگیری سفارش"
          mainTextColor="#417F56"
          secondaryTextColor="#417F56"
        />
      ) : (
        <PaymentMessage
          image={unsuccessfulPaymentImage}
          mainText="پرداخت شما ناموفق بود!"
          secondaryText="کد رهگیری تراکنش شما:  ۶۵۸۵۷۱۲۷"
          secondButtonText="پرداخت مجدد"
          mainTextColor="#C30000"
          secondaryTextColor="#353535"
        />
      )}
    </>
  );
}
