import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UserProfile } from "@/models/UserProfile";

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

    const user = await UserProfile.findOne({ phone_number: phone });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.otp === otp) {
      return NextResponse.json({ success: true, message: "OTP is valid" });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid OTP" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
