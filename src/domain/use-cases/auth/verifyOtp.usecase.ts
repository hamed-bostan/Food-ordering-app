import { findOtpInDb, deleteOtpFromDb } from "@/infrastructure/repositories/otp.repository";
import { ValidationError } from "@/domain/errors";

/**
 * Verifies an OTP code for a given phone number
 */
export async function verifyOtpUseCase(phoneNumber: string, otp: string) {
  // 1. Look up OTP in DB
  const record = await findOtpInDb(phoneNumber);
  if (!record) {
    throw new ValidationError("OTP not found or expired");
  }

  // 2. Check if OTP matches
  if (record.code !== otp) {
    throw new ValidationError("Invalid OTP code");
  }

  // 3. Delete OTP after successful verification
  await deleteOtpFromDb(phoneNumber);

  // 4. Return user info (or minimal info) — you can customize
  // For example, if you store users separately, fetch them here
  // For now, returning phoneNumber only
  return {
    id: record._id.toString(),
    phoneNumber,
    role: "user", // replace with actual role if you fetch from users collection
  };
}
