import { generateOtpCode, sendOtpSms } from "@/lib/otp/otp.helper";
import { deleteOtpFromDb, findOtpInDb, insertOtpToDb } from "./otp.repository";
import { userService } from "@/lib/user/user.service";

async function sendOtp(phoneNumber: string) {
  const code = generateOtpCode();
  await insertOtpToDb(phoneNumber, code);
  await sendOtpSms(phoneNumber, code);

  return { message: "کد ارسال شد.", otp: code };
}

async function verifyOtp(phoneNumber: string, otp: string) {
  const otpRecord = await findOtpInDb(phoneNumber);
  if (!otpRecord) throw new Error("User not found or OTP expired");

  const isExpired = Date.now() - new Date(otpRecord.createdAt).getTime() > 2 * 60 * 1000;
  if (isExpired) {
    await deleteOtpFromDb(phoneNumber);
    throw new Error("OTP expired");
  }

  // Ensure string comparison
  if (otpRecord.code.toString() !== otp.trim()) throw new Error("Invalid OTP");

  await deleteOtpFromDb(phoneNumber);
  return await userService.findOrCreateUser(phoneNumber);
}

export const otpService = {
  sendOtp,
  verifyOtp,
};
