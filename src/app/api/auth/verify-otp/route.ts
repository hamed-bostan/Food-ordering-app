import { NextRequest, NextResponse } from "next/server";
import { otpSchema } from "@/app/auth/otp/lib/schema/otpSchema";
import { ZodError } from "zod";
import { otpService } from "@/app/auth/otp/lib/otp.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = otpSchema.parse(body); // throws ZodError on invalid input

    // Delegate OTP verification to service
    const user = await otpService.verifyOtp(validated.phoneNumber, validated.otp);

    return NextResponse.json({
      message: "OTP is valid",
      user: {
        id: user._id.toString(),
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Verify OTP error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "ValidationError", details: error.errors }, { status: 400 });
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "ServerError", message: errorMessage }, { status: 500 });
  }
}
