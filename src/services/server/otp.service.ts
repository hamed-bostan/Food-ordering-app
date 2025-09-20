import { deleteOtpFromDb, findOtpInDb, insertOtpToDb } from "@/infrastructure/repositories/otp.repository";
import { generateOtpCode, sendOtpSms } from "@/infrastructure/sms/otp.service";
import { userService } from "./user.service";

// Configurable OTP expiration (2 min)
const OTP_EXPIRATION_MS = 2 * 60 * 1000;

async function sendOtp(phoneNumber: string) {
  const code = generateOtpCode();
  await insertOtpToDb(phoneNumber, code);
  await sendOtpSms(phoneNumber, code);

  return { message: "کد ارسال شد.", otp: code };
}

async function verifyOtp(phoneNumber: string, otp: string) {
  const otpRecord = await findOtpInDb(phoneNumber);
  if (!otpRecord) throw new Error("User not found or OTP expired");

  // Check expiration
  const isExpired = Date.now() - new Date(otpRecord.createdAt).getTime() > OTP_EXPIRATION_MS;
  if (isExpired) {
    await deleteOtpFromDb(phoneNumber);
    throw new Error("OTP expired");
  }

  // String comparison
  if (otpRecord.code.toString() !== otp.trim()) throw new Error("Invalid OTP");

  // OTP verified → delete it
  await deleteOtpFromDb(phoneNumber);

  // Return user (auto-created if doesn't exist)
  return await userService.findOrCreateUserByPhone(phoneNumber);
}

export const otpService = {
  sendOtp,
  verifyOtp,
};
