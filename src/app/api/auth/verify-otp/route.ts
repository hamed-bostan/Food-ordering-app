import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { otpSchema } from "@/lib/otp/otpValidationSchemas";

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

    const client = await clientPromise;
    const db = client.db();

    // Find OTP record for the phone
    const otpRecord = await db.collection("otps").findOne({ userPhoneNumber });

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
    await db.collection("otps").deleteMany({ userPhoneNumber });

    return NextResponse.json({ message: "OTP is valid" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
