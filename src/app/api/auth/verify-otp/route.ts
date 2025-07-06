import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Missing phone or OTP" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Find OTP record for the phone
    const otpRecord = await db.collection("otps").findOne({ phone });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "User not found or OTP expired" },
        { status: 404 }
      );
    }

    if (otpRecord.code !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    // OTP is valid - delete used OTP for security
    await db.collection("otps").deleteMany({ phone });

    return NextResponse.json({ message: "OTP is valid" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
