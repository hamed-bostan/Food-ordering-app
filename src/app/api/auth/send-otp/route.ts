import { NextRequest, NextResponse } from "next/server";
import { sendOtpUseCase } from "@/domain/use-cases/auth/sendOtp.usecase";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";

/**
 * POST /api/auth/send-otp
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await sendOtpUseCase(body);

    return NextResponse.json({ message: "OTP sent successfully", result }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Send OTP API - POST");
  }
}
