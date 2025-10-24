import axios from "axios";
import { ApiErrorResponse } from "@/types/api-error";
import { AdminFormProfileType, UserProfileType } from "@/application/schemas/profile-schema";
import { api } from "../axios/api.client";
import { UserSchema, UserType, UserRoleType } from "@/application/schemas/user.schema";

export type GetUserResponse = { message: string; result: UserType };
export type GetUsersResponse = { message: string; result: UserType[] };
export type UpdateUserResponse = { message: string; result: UserType };
// export type AdminUpdateUserPayload = Partial<UserProfileType> & { role?: UserRoleType };
export type AdminUpdateUserPayload = Partial<AdminFormProfileType> & { role?: UserRoleType }; // Use AdminFormProfileType for relaxed address

// Fetch a single user by ID
export const getUserById = async (id: string, token: string): Promise<GetUserResponse> => {
  try {
    const { data } = await api.get<GetUserResponse>(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.result) throw new Error("User not found");

    // ✅ runtime validation
    const validatedUser = UserSchema.parse(data.result);

    return { ...data, result: validatedUser };
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

// Update the logged-in user's profile
export const updateUserProfile = async (
  userId: string,
  payload: Partial<UserProfileType>,
  token: string
): Promise<UpdateUserResponse> => {
  try {
    const { data } = await api.put<UpdateUserResponse>(`/user/${userId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.result) throw new Error("Failed to update user profile");

    // ✅ runtime validation
    const validatedUser = UserSchema.parse(data.result);

    return { ...data, result: validatedUser };
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
