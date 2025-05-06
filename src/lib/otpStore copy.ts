const otpStore = new Map<string, string>();

export function storeOtp(phone: string, otp: string) {
  otpStore.set(phone, otp);
  // Optionally set timeout to clear after 2 minutes

  setTimeout(() => otpStore.delete(phone), 2 * 60 * 1000); // 2 minutes
}

export function verifyOtp(phone: string, otp: string): boolean {
  const storedOtp = otpStore.get(phone);
  return storedOtp === otp;
}
