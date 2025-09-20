import { NextRequest, NextResponse } from "next/server";
import { otpSchema } from "@/domain/otpSchema";
import { otpService } from "@/services/server/otp.service";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * POST /api/auth/verify-otp
 *
 * Verifies an OTP code for a given phone number.
 */

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validated = otpSchema.parse(body);

    // Delegate OTP verification to service
    const user = await otpService.verifyOtp(validated.phoneNumber, validated.otp);

    return NextResponse.json(
      {
        message: "OTP is valid",
        result: {
          id: user.id,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return apiErrorHandler(error, "Verify OTP API - POST");
  }
}
