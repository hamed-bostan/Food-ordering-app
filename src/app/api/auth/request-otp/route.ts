import { NextResponse } from "next/server";
import Kavenegar from "kavenegar";

type KavenegarResponseEntry = {
  messageid: number;
  message: string;
  status: number;
  statustext: string;
  sender: string;
  receptor: string;
  date: number;
  cost: number;
};

const api = Kavenegar.KavenegarApi({
  apikey: process.env.KAVENEGAR_API_KEY!,
});

const otpStore = new Map<string, string>();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!/^09\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "شماره نامعتبر است" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Sending OTP to:", phone, "with code:", otp);

    // Use verified lookup template
    await new Promise<void>((resolve, reject) => {
      api.VerifyLookup(
        {
          receptor: phone,
          token: otp,
          template: "soprano-otp", // <-- your approved template name
        },
        function (response: KavenegarResponseEntry[] | any, status: number) {
          console.log("Kavenegar Response:", response);
          console.log("Kavenegar Status:", status);

          if (
            Array.isArray(response) &&
            response[0]?.status >= 1 &&
            response[0]?.status <= 6 // "ارسال به مخابرات", "در صف", etc.
          ) {
            otpStore.set(phone, otp);
            resolve();
          } else {
            const message = Array.isArray(response)
              ? response[0]?.statustext
              : response?.return?.message;
            reject(new Error(message || "خطا در ارسال پیامک"));
          }
        }
      );
    });

    return NextResponse.json({ message: "کد ارسال شد" });
  } catch (err: unknown) {
    console.error("OTP Error:", err);
    if (err instanceof Error) {
      return NextResponse.json(
        { error: `خطایی رخ داد: ${err.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "خطایی رخ داد" }, { status: 500 });
  }
}
