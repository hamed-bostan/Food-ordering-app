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

// OTP generator
export const generateOtpCode = (): string => Math.floor(10000 + Math.random() * 90000).toString();
