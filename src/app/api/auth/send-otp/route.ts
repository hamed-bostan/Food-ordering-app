import { NextRequest, NextResponse } from "next/server";
import { phoneSchema } from "@/app/auth/otp/lib/schema/otpSchema";
import { ZodError } from "zod";
import { otpService } from "@/app/auth/otp/lib/otp.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = phoneSchema.parse(body);

    const result = await otpService.sendOtp(validated.phoneNumber);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("❌ Send OTP error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "ValidationError", details: error.errors }, { status: 400 });
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "ServerError", message: errorMessage }, { status: 500 });
  }
}
