import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { UserRecordInsert } from "../db/users/user.db.types";
import { UserCreateDto, UserUpdateDto } from "@/application/dto/users/user.dto";
import { normalizeAddress } from "@/infrastructure/mappers/address.mapper";

const COLLECTION_NAME = "users";

/**
 * Database representation of a user
 */
export type DbUser = UserRecordInsert & { _id: ObjectId };

/**
 * Helper to convert string to ObjectId
 */
function toObjectId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) throw new Error("Invalid user ID");
  return new ObjectId(id);
}

/**
 * Fetch all users
 */
export async function fetchUsersFromDb(): Promise<DbUser[]> {
  const db = await connectToDatabase();
  return db.collection<DbUser>(COLLECTION_NAME).find({}).toArray();
}

/**
 * Find user by ID
 */
export async function findUserByIdInDb(userId: string): Promise<DbUser | null> {
  const db = await connectToDatabase();
  return db.collection<DbUser>(COLLECTION_NAME).findOne({ _id: toObjectId(userId) });
}

/**
 * Update user by ID (find → update → fetch pattern)
 */
export async function updateUserInDb(userId: string, update: UserUpdateDto): Promise<DbUser> {
  const db = await connectToDatabase();

  const existingUser = await db.collection<DbUser>(COLLECTION_NAME).findOne({ _id: toObjectId(userId) });
  if (!existingUser) throw new Error("User not found");

  // ✅ Normalize address before updating
  const updateWithIds = { ...update, address: normalizeAddress(update.address) };

  await db
    .collection<DbUser>(COLLECTION_NAME)
    .updateOne({ _id: existingUser._id }, { $set: updateWithIds as Partial<DbUser> });

  const updatedUser = await db.collection<DbUser>(COLLECTION_NAME).findOne({ _id: existingUser._id });
  if (!updatedUser) throw new Error("Failed to fetch updated user");

  return updatedUser;
}

/**
 * Find user by phone number
 */
export async function findUserByPhoneInDb(phoneNumber: string): Promise<DbUser | null> {
  const db = await connectToDatabase();
  return db.collection<DbUser>(COLLECTION_NAME).findOne({ phoneNumber });
}

/**
 * Insert a new user
 */
export async function insertUserToDb(user: UserCreateDto): Promise<DbUser> {
  const db = await connectToDatabase();

  const userRecord: UserRecordInsert = {
    ...user,
    address: normalizeAddress(user.address),
    createdAt: new Date().toISOString(),
  };

  const result = await db.collection<UserRecordInsert>(COLLECTION_NAME).insertOne(userRecord);

  const insertedUser = await db.collection<DbUser>(COLLECTION_NAME).findOne({ _id: result.insertedId });
  if (!insertedUser) throw new Error("Failed to insert user");

  return insertedUser;
}

/**
 * Delete user by ID
 */
export async function deleteUserFromDb(userId: string): Promise<boolean> {
  const db = await connectToDatabase();
  const result = await db.collection<DbUser>(COLLECTION_NAME).deleteOne({ _id: toObjectId(userId) });
  if (result.deletedCount === 0) throw new Error("User not found or already deleted");
  return true;
}
