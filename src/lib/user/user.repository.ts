import { connectToDatabase } from "@/lib/db/mongodb";

// Handles direct database operations only (CRUD).
// No business logic, just talk to MongoDB.

export const collectionName = "users";

export async function findUserInDb(userPhoneNumber: string) {
  const db = await connectToDatabase();
  return db.collection(collectionName).findOne({ userPhoneNumber });
}

export async function insertUserToDb(user: { userPhoneNumber: string; role: string }) {
  const db = await connectToDatabase();
  const result = await db.collection(collectionName).insertOne(user);
  return result.insertedId;
}

export async function deleteUserFromDb(userPhoneNumber: string) {
  const db = await connectToDatabase();
  return db.collection(collectionName).deleteOne({ userPhoneNumber });
}

export async function updateUserInDb(
  userPhoneNumber: string,
  update: Partial<{ role: string; name: string; email: string }>
) {
  const db = await connectToDatabase();
  return db.collection(collectionName).updateOne({ userPhoneNumber }, { $set: update });
}
