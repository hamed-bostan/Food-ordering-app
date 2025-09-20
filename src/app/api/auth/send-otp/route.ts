import { NextRequest, NextResponse } from "next/server";
import { phoneSchema } from "@/domain/otpSchema";
import { otpService } from "@/services/server/otp.service";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * POST /api/auth/send-otp
 *
 * Sends an OTP to a phone number.
 * - Validates phone number input with Zod
 * - Returns a standardized message and result
 */
export async function POST(req: NextRequest) {
  try {
    // Parse & validate request body
    const body = await req.json();
    const validated = phoneSchema.parse(body);

    // Call OTP service
    const result = await otpService.sendOtp(validated.phoneNumber);

    // Return standardized message
    return NextResponse.json(
      {
        message: "OTP sent successfully",
        result,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return apiErrorHandler(error, "Send OTP API - POST");
  }
}
