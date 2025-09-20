import axios from "axios";
import { ApiErrorResponse } from "@/types/api-error";
import { ProfileModel } from "@/domain/profile-schema";
import { User } from "@/types/user.types";
import { normalizeUser } from "@/infrastructure/repositories/user.normalize";
import { api } from "@/infrastructure/axios/api.client";

export type GetUserResponse = { message: string; result: User };
export type GetUsersResponse = { message: string; result: User[] };
export type UpdateUserResponse = { message: string; result: User };
export type AdminUpdateUserPayload = Partial<ProfileModel> & { role?: User["role"] };

// Fetch all users (requires admin JWT)
export const getUsersAdmin = async (token: string): Promise<GetUsersResponse> => {
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

// Update user by admin
export const updateUserAdmin = async (
  userId: string,
  payload: AdminUpdateUserPayload,
  token: string
): Promise<UpdateUserResponse> => {
  try {
    const { data } = await api.put<UpdateUserResponse>(`/admin/users/${userId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.result) throw new Error("Failed to update user");

    return { ...data, result: normalizeUser(data.result) };
  } catch (error: unknown) {
    console.error("❌ [API] Admin failed to update user:", error);

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

    throw new Error("Unexpected error while updating user by admin");
  }
};

// Delete user by admin
export const deleteUserAdmin = async (userId: string, token: string): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data?.message) throw new Error("Failed to delete user");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Admin failed to delete user:", error);

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

    throw new Error("Unexpected error while deleting user by admin");
  }
};
