import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { User } from "@/types/user.types";
import { ObjectId } from "mongodb";

export const collectionName = "users";

/**
 * Fetch a single user by MongoDB _id
 */
export async function findUserByIdInDb(userId: string): Promise<User | null> {
  if (!ObjectId.isValid(userId)) throw new Error("Invalid user ID");

  const db = await connectToDatabase();
  return db.collection<User>(collectionName).findOne({ _id: new ObjectId(userId) });
}

/**
 * Fetch a single user by phoneNumber (use only for login/OTP/etc.)
 */
export async function findUserByPhoneInDb(phoneNumber: string): Promise<User | null> {
  const db = await connectToDatabase();
  return db.collection<User>(collectionName).findOne({ phoneNumber });
}

/**
 * Insert a new user
 */
export async function insertUserToDb(user: { phoneNumber: string; role: string }): Promise<ObjectId> {
  const db = await connectToDatabase();
  const result = await db.collection(collectionName).insertOne(user);
  return result.insertedId;
}

/**
 * Delete a user by MongoDB _id
 */
export async function deleteUserFromDb(userId: string): Promise<boolean> {
  if (!ObjectId.isValid(userId)) throw new Error("Invalid user ID");

  const db = await connectToDatabase();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(userId) });

  if (result.deletedCount === 0) throw new Error("User not found or already deleted");

  return true;
}

/**
 * Update a user by MongoDB _id
 */
export async function updateUserInDb(
  userId: string,
  update: Partial<Pick<User, "name" | "email" | "role" | "phoneNumber" | "image">>
): Promise<User> {
  if (!ObjectId.isValid(userId)) throw new Error("Invalid user ID");

  // Prevent updating _id explicitly
  if ("_id" in update) delete update._id;

  const db = await connectToDatabase();
  const updateResult = await db
    .collection<User>(collectionName)
    .updateOne({ _id: new ObjectId(userId) }, { $set: update });

  if (updateResult.matchedCount === 0) throw new Error("User not found");

  const updatedUser = await db.collection<User>(collectionName).findOne({ _id: new ObjectId(userId) });
  if (!updatedUser) throw new Error("User not found after update");

  return updatedUser;
}
