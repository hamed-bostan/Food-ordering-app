import { NextResponse } from "next/server";
import { generateOtp, sendOtp } from "@/utils/otp";
import { getDb } from "@/lib/getDB";

export const POST = async (req: Request) => {
  try {
    const { phone } = await req.json();

    if (!phone || !/^09\d{9}$/.test(phone)) {
      return NextResponse.json(
        { message: "شماره معتبر نیست" },
        { status: 400 }
      );
    }

    const code = generateOtp();

    const db = await getDb();
    const collection = db.collection("otps");

    // حذف کدهای قبلی برای این شماره
    await collection.deleteMany({ phone });

    // ذخیره کد جدید
    await collection.insertOne({
      phone,
      code,
      createdAt: new Date(),
    });

    // ارسال پیامک
    await sendOtp(phone, code);

    return NextResponse.json({ success: true, message: "کد ارسال شد" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "خطا در ارسال کد" }, { status: 500 });
  }
};
