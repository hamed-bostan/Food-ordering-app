export const generateOtp = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const sendOtp = async (mobile: string, code: string) => {
  const url = "https://api.sms.ir/v1/send/verify";

  const payload = {
    mobile,
    templateId: 562447,
    parameters: [
      {
        name: "CODE",
        value: code,
      },
    ],
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-KEY": process.env.SMS_IR_API_KEY || "",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("خطا در ارسال پیامک");
  }
};
