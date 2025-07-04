"use server";

export const startPayment = async (amount: number) => {
  const zibalMerchant = process.env.ZIBAL_MERCHANT || "zibal";

  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/payment`;

  const response = await fetch("https://gateway.zibal.ir/v1/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant: zibalMerchant,
      amount,
      callbackUrl,
    }),
  });

  const result = await response.json();

  if (result.result === 100) {
    return {
      paymentUrl: `https://gateway.zibal.ir/start/${result.trackId}`,
    };
  }

  return null;
};

export const verifyPayment = async (trackId: string) => {
  const zibalMerchant = process.env.ZIBAL_MERCHANT || "zibal";

  const response = await fetch("https://gateway.zibal.ir/v1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant: zibalMerchant,
      trackId,
    }),
  });

  const result = await response.json();

  if (result.result === 100) {
    return { success: true, refNumber: result.refNumber };
  }

  return { success: false };
};
