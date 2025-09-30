import axios from "axios";

const zibalApi = "https://gateway.zibal.ir/v1";
const zibalMerchant = process.env.ZIBAL_MERCHANT || "zibal";
const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/payment`;

export async function startPayment(amount: number) {
  try {
    const { data } = await axios.post(`${zibalApi}/request`, {
      merchant: zibalMerchant,
      amount,
      callbackUrl,
    });

    if (data.result === 100) {
      return {
        trackId: data.trackId,
        paymentUrl: `https://gateway.zibal.ir/start/${data.trackId}`,
      };
    }

    return null;
  } catch (error) {
    console.error("StartPayment error:", error);
    return null;
  }
}

export async function verifyPayment(trackId: string) {
  try {
    const { data } = await axios.post(`${zibalApi}/verify`, {
      merchant: zibalMerchant,
      trackId,
    });

    if (data.result === 100) {
      return { success: true, refNumber: data.refNumber };
    }

    return { success: false, message: data.message };
  } catch (error) {
    console.error("VerifyPayment error:", error);
    return { success: false };
  }
}
