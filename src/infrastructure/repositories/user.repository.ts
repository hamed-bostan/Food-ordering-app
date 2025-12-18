import { ObjectId, UpdateFilter } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { UserRecordInsert } from "../db/users/user.db.types";
import { UserCreateDto, UserUpdateDto } from "@/application/dto/users/user.dto";
import { normalizeAddress } from "@/infrastructure/mappers/address.mapper";
import { mapDbUserToDomain } from "@/infrastructure/mappers/user.mapper";
import { UserType } from "@/application/schemas/user.schema";
import { IUserRepository } from "@/domain/interfaces/iuser-repository";

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

export class UserRepository implements IUserRepository {
  private async getCollection() {
    const db = await connectToDatabase();
    return db.collection<DbUser>(COLLECTION_NAME);
  }

  async findAll(): Promise<UserType[]> {
    const collection = await this.getCollection();
    const dbUsers = await collection.find({}).toArray();
    return dbUsers.map(mapDbUserToDomain);
  }

  async findById(userId: string): Promise<UserType | null> {
    const collection = await this.getCollection();
    const dbUser = await collection.findOne({ _id: toObjectId(userId) });
    return dbUser ? mapDbUserToDomain(dbUser) : null;
  }

  async findByPhone(phoneNumber: string): Promise<UserType | null> {
    const collection = await this.getCollection();
    const dbUser = await collection.findOne({ phoneNumber });
    return dbUser ? mapDbUserToDomain(dbUser) : null;
  }

  async create(user: UserCreateDto): Promise<UserType> {
    const collection = await this.getCollection();
    const userRecord: UserRecordInsert = {
      ...user,
      address: normalizeAddress(user.address),
      createdAt: new Date().toISOString(),
    };
    const result = await collection.insertOne(userRecord as DbUser); // Cast to satisfy type
    const insertedUser = await collection.findOne({ _id: result.insertedId });
    if (!insertedUser) throw new Error("Failed to insert user");
    return mapDbUserToDomain(insertedUser);
  }

  async update(userId: string, update: UserUpdateDto): Promise<UserType> {
    const collection = await this.getCollection();
    const existingUser = await collection.findOne({ _id: toObjectId(userId) });
    if (!existingUser) throw new Error("User not found");

    // Normalize address if provided
    const address = update.address !== undefined ? normalizeAddress(update.address) : undefined;

    // Prepare $set
    const $set: Partial<UserRecordInsert> = {};
    if (update.name !== undefined) $set.name = update.name;
    if (update.phoneNumber !== undefined) $set.phoneNumber = update.phoneNumber;
    if (update.role !== undefined) $set.role = update.role;
    if (update.image !== undefined) $set.image = update.image;
    if (address !== undefined) $set.address = address;

    // Prepare $unset and handle email specially
    const $unset: { email?: "" } = {};
    if (update.email !== undefined) {
      if (update.email === "") {
        $unset.email = "";
      } else {
        $set.email = update.email;
      }
    }

    const updateOp: UpdateFilter<DbUser> = {};
    if (Object.keys($set).length > 0) updateOp.$set = $set;
    if (Object.keys($unset).length > 0) updateOp.$unset = $unset;

    await collection.updateOne({ _id: existingUser._id }, updateOp);

    const updatedUser = await collection.findOne({ _id: existingUser._id });
    if (!updatedUser) throw new Error("Failed to fetch updated user");
    return mapDbUserToDomain(updatedUser);
  }

  async delete(userId: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: toObjectId(userId) });
    if (result.deletedCount === 0) throw new Error("User not found or already deleted");
    return true;
  }
}
