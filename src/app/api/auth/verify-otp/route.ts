import { NextRequest, NextResponse } from "next/server";
import { otpSchema } from "@/lib/otp/otpValidationSchemas";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = otpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { userPhoneNumber, otp } = result.data;

    const db = await connectToDatabase();
    const collection = db.collection("otps");

    // Find OTP record for the phone
    const otpRecord = await collection.findOne({ userPhoneNumber });

    if (!otpRecord) {
      return NextResponse.json({ error: "User not found or OTP expired" }, { status: 404 });
    }

    // EXPIRATION CHECK
    const isExpired = Date.now() - new Date(otpRecord.createdAt).getTime() > 2 * 60 * 1000;
    if (isExpired) {
      await collection.deleteMany({ userPhoneNumber });
      return NextResponse.json({ error: "OTP expired" }, { status: 410 });
    }

    // Compare codes
    if (otpRecord.code !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    // OTP is valid - delete used OTP
    await collection.deleteMany({ userPhoneNumber });

    return NextResponse.json({ message: "OTP is valid" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
