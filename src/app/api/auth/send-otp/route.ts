import { NextResponse } from "next/server";
import { generateOtp, sendOtp } from "@/utils/otp";
import { getDb } from "@/lib/getDB";

export const POST = async (req: Request) => {
  try {
    const { userPhoneNumber } = await req.json();

    if (!userPhoneNumber || !/^09\d{9}$/.test(userPhoneNumber)) {
      return NextResponse.json(
        { message: "شماره معتبر نیست" },
        { status: 400 }
      );
    }

    const code = generateOtp();
    const db = await getDb();
    const collection = db.collection("otps");

    // حذف کدهای قبلی برای این شماره
    await collection.deleteMany({ userPhoneNumber });

    // ذخیره کد جدید
    await collection.insertOne({
      userPhoneNumber,
      code,
      createdAt: new Date(),
    });

    // ارسال پیامک
    await sendOtp(userPhoneNumber, code);

    return NextResponse.json({ message: "کد ارسال شد." }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "خطا در ارسال کد" }, { status: 500 });
  }
};
