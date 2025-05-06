import axios from "axios";

const KAVENEGAR_API_KEY = process.env.KAVENEGAR_API_KEY!;
const KAVENEGAR_TEMPLATE_NAME = "soprano-otp";

export const sendOtp = async (mobile: string, otp: string) => {
  try {
    const response = await axios.get(
      "https://api.kavenegar.com/v1/" +
        KAVENEGAR_API_KEY +
        "/verify/lookup.json",
      {
        params: {
          receptor: mobile,
          token: otp,
          template: KAVENEGAR_TEMPLATE_NAME,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Kavenegar error:", error.response?.data || error.message);
    throw new Error("Failed to send OTP");
  }
};
