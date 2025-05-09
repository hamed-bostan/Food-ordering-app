import { NextRequest, NextResponse } from "next/server";
import { sendOtp } from "@/lib/kavenegar";
import { OtpCode } from "@/models/OtpCode";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Missing phone or OTP" },
        { status: 400 }
      );
    }

    await connectDB();

    // Save to MongoDB
    await OtpCode.create({ phone, code: otp });

    // Send SMS
    const result = await sendOtp(phone, otp);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
