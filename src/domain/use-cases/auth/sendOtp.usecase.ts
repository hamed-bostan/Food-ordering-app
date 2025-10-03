import { phoneSchema } from "@/application/schemas/otpSchema";
import { insertOtpToDb, generateOtpCode } from "@/infrastructure/repositories/otp.repository";
import { sendOtpSms } from "@/infrastructure/sms.gateway";

export async function sendOtpUseCase(body: unknown) {
  const validated = phoneSchema.parse(body);

  // Generate OTP
  const code = generateOtpCode();

  // Save to DB
  await insertOtpToDb(validated.phoneNumber, code);

  // Send SMS
  await sendOtpSms(validated.phoneNumber, code);

  return { phoneNumber: validated.phoneNumber, code }; // optionally hide code in production
}
