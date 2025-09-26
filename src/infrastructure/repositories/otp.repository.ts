import axios from "axios";
import { connectToDatabase } from "@/infrastructure/db/mongodb";

export const collectionName = "otps";

// DB operations
export async function insertOtpToDb(phoneNumber: string, code: string) {
  const db = await connectToDatabase();
  const otpCollection = db.collection(collectionName);

  await otpCollection.deleteMany({ phoneNumber });
  await otpCollection.insertOne({
    phoneNumber,
    code,
    createdAt: new Date(),
  });
}

export async function findOtpInDb(phoneNumber: string) {
  const db = await connectToDatabase();
  return db.collection(collectionName).findOne({ phoneNumber });
}

export async function deleteOtpFromDb(phoneNumber: string) {
  const db = await connectToDatabase();
  return db.collection(collectionName).deleteMany({ phoneNumber });
}

// External SMS sending
export async function sendOtpSms(phoneNumber: string, code: string) {
  const url = "https://api.sms.ir/v1/send/verify";
  const payload = {
    mobile: phoneNumber,
    templateId: 562447,
    parameters: [{ name: "CODE", value: code }],
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-KEY": process.env.SMS_IR_API_KEY || "",
  };

  try {
    const { data } = await axios.post(url, payload, { headers });

    if (data?.status !== 1) {
      throw new Error(data?.message || "خطا در ارسال پیامک");
    }

    return data;
  } catch (err: any) {
    console.error("sendOtpSms error:", err?.response?.data || err.message);
    throw new Error("خطا در ارسال پیامک");
  }
}

// OTP generator
export const generateOtpCode = (): string => Math.floor(10000 + Math.random() * 90000).toString();
