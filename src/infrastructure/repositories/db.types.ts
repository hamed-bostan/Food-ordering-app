import { UserType } from "@/application/schemas/user.schema";
import { ObjectId } from "mongodb";

/**
 * Database representation of a user.
 * Note: _id is the MongoDB ObjectId,
 * address is stored as an array of addresses (or empty array/null)
 */
export type DbUser = Omit<UserType, "id" | "createdAt"> & {
  _id: ObjectId;
  createdAt: string | Date;
};
