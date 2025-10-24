import { UserType } from "@/application/schemas/user.schema";

/**
 * DB insert type (what MongoDB expects when creating a user)
 */
export type UserRecordInsert = Omit<UserType, "id" | "createdAt"> & {
  createdAt: string; // DB stores as ISO string
};

export type UserRecordUpdate = Partial<Omit<UserRecordInsert, "id">>;
