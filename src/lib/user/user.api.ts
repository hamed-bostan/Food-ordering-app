import api from "../axios";
import { BaseUser, User, UserRole } from "./user.types";

// Define the raw shape as it comes from MongoDB
export type MongoUser = {
  _id: string;
  phoneNumber: string;
  role: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt?: string | null;
};

// Utility to safely normalize MongoDB documents into our User type
function normalizeUser(mongoUser: MongoUser): User {
  return {
    id: mongoUser._id,
    phoneNumber: mongoUser.phoneNumber,
    role: mongoUser.role as UserRole,
    name: mongoUser.name ?? null,
    email: mongoUser.email ?? null,
    image: mongoUser.image ?? null,
    createdAt: mongoUser.createdAt ?? null,
  };
}

export const userApi = {
  async fetchUserById(id: string): Promise<User> {
    try {
      const response = await api.get<MongoUser>(`/user/${id}`);
      return normalizeUser(response.data);
    } catch (error: unknown) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user by ID. Please try again later.");
    }
  },

  async fetchUsers(): Promise<BaseUser[]> {
    try {
      const response = await api.get<MongoUser[]>("/admin/users");
      return response.data.map((mongoUser: MongoUser) => normalizeUser(mongoUser));
    } catch (error: unknown) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users. Please try again later.");
    }
  },

  async updateUserRole(phoneNumber: string, role: UserRole): Promise<User> {
    try {
      const response = await api.post<MongoUser>("/admin/set-role", { phoneNumber, role });
      return normalizeUser(response.data);
    } catch (error: unknown) {
      console.error("Error updating user role:", error);
      throw new Error("Failed to update user role. Please try again later.");
    }
  },
};
