import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ message: "شماره وارد نشده" }, { status: 400 });
    }

    // تولید کد رندوم ۵ رقمی
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const response = await axios.post(
      "https://api.sms.ir/v1/send/verify",
      {
        mobile: phone,
        templateId: 562447,
        parameters: [{ name: "CODE", value: code }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "83d500krxwSAZtrvy8lvbZBI0oKd0RJhPJwn4hAFlY4moFF3",
        },
      }
    );

    return NextResponse.json({ success: true, codeSent: true });
  } catch (error: any) {
    console.error("خطا در ارسال OTP:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "خطا در ارسال پیامک" },
      { status: 500 }
    );
  }
}
