import { NextRequest, NextResponse } from "next/server";
import { sendOtp } from "@/lib/kavenegar";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Missing phone or OTP" }, { status: 400 });
    }

    const result = await sendOtp(phone, otp);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
