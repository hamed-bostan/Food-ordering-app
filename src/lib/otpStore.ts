const otpStore = new Map<string, string>();

export function storeOtp(phone: string, otp: string) {
  otpStore.set(phone, otp);
  setTimeout(() => otpStore.delete(phone), 2 * 60 * 1000); // clear after 2 min
}

export function verifyOtp(phone: string, otp: string): boolean {
  return otpStore.get(phone) === otp;
}
