import { User, UserRole } from "./user.types";
import { ProfileSchema } from "@/app/userpanel/components/profile/profile-schema";
import { getSession } from "next-auth/react";
import { normalizeUser } from "./user.utils";
import api from "../axios";
import axios from "axios";
import { ApiErrorResponse } from "@/types/api-error";

export type GetUserResponse = { message: string; result: User };
export type GetUsersResponse = { message: string; result: User[] };
export type UpdateUserResponse = { message: string; result: User };

// Fetch a single user by ID
export const getUserById = async (id: string, token: string): Promise<GetUserResponse> => {
  try {
    const { data } = await api.get<GetUserResponse>(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.result) throw new Error("User not found");

    return { ...data, result: normalizeUser(data.result) };
  } catch (error: unknown) {
    console.error("❌ [API] Failed to fetch user by ID:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while fetching user by ID");
  }
};

// Fetch all users (requires admin JWT)
export const getUsers = async (token: string): Promise<GetUsersResponse> => {
  try {
    const { data } = await api.get<GetUsersResponse>("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!Array.isArray(data.result)) throw new Error("Invalid server response");

    return { ...data, result: data.result.map(normalizeUser) };
  } catch (error: unknown) {
    console.error("❌ [API] Failed to fetch users:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while fetching users");
  }
};

// Update user role (admin only)
export const updateUserRole = async (phoneNumber: string, role: UserRole): Promise<UpdateUserResponse> => {
  try {
    const session = await getSession();
    const token = session?.accessToken;
    if (!token) throw new Error("No access token found");

    const { data } = await api.post<UpdateUserResponse>(
      "/admin/set-role",
      { phoneNumber, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!data.result) throw new Error("Failed to update user role");

    return { ...data, result: normalizeUser(data.result) };
  } catch (error: unknown) {
    console.error("❌ [API] Failed to update user role:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while updating user role");
  }
};

// Update the logged-in user's profile
export const updateUserProfile = async (
  userId: string,
  payload: Partial<ProfileSchema>,
  token: string
): Promise<UpdateUserResponse> => {
  try {
    const { data } = await api.put<UpdateUserResponse>(`/user/${userId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.result) throw new Error("Failed to update user profile");

    return { ...data, result: normalizeUser(data.result) };
  } catch (error: unknown) {
    console.error("❌ [API] Failed to update user profile:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while updating user profile");
  }
};
