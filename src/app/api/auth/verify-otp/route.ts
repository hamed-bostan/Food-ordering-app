import { NextRequest, NextResponse } from "next/server";
import { otpSchema } from "@/application/schemas/otpSchema";
import { verifyOtpUseCase } from "@/domain/use-cases/auth/verifyOtp.usecase";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";

/**
 * POST /api/auth/verify-otp
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = otpSchema.parse(body);

    const user = await verifyOtpUseCase(validated.phoneNumber, validated.otp);

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
    return apiResponseErrorHandler(error, "Verify OTP API - POST");
  }
}
