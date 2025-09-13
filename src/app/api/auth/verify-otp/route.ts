import { NextRequest, NextResponse } from "next/server";
import { otpSchema } from "@/app/auth/otp/lib/schema/otpSchema";
import { otpService } from "@/app/auth/otp/lib/otp.service";
import { handleApiError } from "@/lib/errors/handleApiError";

/**
 * POST /api/auth/verify-otp
 *
 * Verifies an OTP code for a given phone number.
 * - Validates input using Zod
 * - Delegates verification to otpService
 * - Returns a standardized message and result
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
          id: user._id.toString(),
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return handleApiError(error, "Verify OTP API - POST");
  }
}
