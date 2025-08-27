import { NextResponse } from "next/server";
import { generateOtp, sendOtp } from "@/lib/otp/helpers";
import { getDb } from "@/lib/db/getDB";
import { phoneSchema } from "@/lib/otp/otpValidationSchemas";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const result = phoneSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "شماره معتبر نیست",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { userPhoneNumber } = result.data;

    const code = generateOtp();
    const db = await getDb();
    const collection = db.collection("otps");

    // Remove any existing OTPs for this phone number
    await collection.deleteMany({ userPhoneNumber });

    // Store the new OTP
    await collection.insertOne({
      userPhoneNumber,
      code,
      createdAt: new Date(),
    });

    // Send OTP via SMS
    await sendOtp(userPhoneNumber, code);

    return NextResponse.json({ message: "کد ارسال شد." }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "خطا در ارسال کد" }, { status: 500 });
  }
};
