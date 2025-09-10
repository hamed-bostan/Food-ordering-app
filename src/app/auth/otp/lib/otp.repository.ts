import { connectToDatabase } from "@/lib/db/mongodb";

export const collectionName = "otps";

export async function insertOtpToDb(phoneNumber: string, code: string) {
  const db = await connectToDatabase();
  const otpCollection = db.collection(collectionName);

  await otpCollection.deleteMany({ phoneNumber }); // clear old ones
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
