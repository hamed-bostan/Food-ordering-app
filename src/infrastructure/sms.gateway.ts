import axios from "axios";

// External SMS sending
export async function sendOtpSms(phoneNumber: string, code: string) {
  const url = "https://api.sms.ir/v1/send/verify";
  const payload = {
    mobile: phoneNumber,
    templateId: 562447,
    parameters: [{ name: "CODE", value: code }],
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-KEY": process.env.SMS_IR_API_KEY || "",
  };

  try {
    const { data } = await axios.post(url, payload, { headers });

    if (data?.status !== 1) {
      throw new Error(data?.message || "خطا در ارسال پیامک");
    }

    return data;
  } catch (err: any) {
    console.error("sendOtpSms error:", err?.response?.data || err.message);
    throw new Error("خطا در ارسال پیامک");
  }
}
