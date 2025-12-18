import { UserType } from "@/application/schemas/user.schema";
import { api } from "@/infrastructure/axios/api.client";
import { apiCallErrorHandler } from "@/infrastructure/error-handlers/apiCallErrorHandler";
import { UserUpdateFormType } from "@/application/schemas/user.form.schema";

export type GetUsersResponse = { message: string; result: UserType[] };
export type GetUserByIdResponse = { message: string; result: UserType };
export type UpdateUserResponse = { message: string; result: UserType };
export type DeleteUserResponse = { message: string };

// Fetch all users (admin)
export const getUsersAdmin = async (token: string): Promise<GetUsersResponse> => {
  try {
    const { data } = await api.get<GetUsersResponse>("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!Array.isArray(data.result)) throw new Error("Invalid server response");
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "fetch users");
  }
};

// Get user by ID (admin)
export const getUserByIdAdmin = async (id: string, token: string): Promise<GetUserByIdResponse> => {
  try {
    const { data } = await api.get<GetUserByIdResponse>(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.result || typeof data.result !== "object") throw new Error("Invalid server response");
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "fetch user by ID");
  }
};

// Update user (admin)
export const updateUserAdmin = async (
  userId: string,
  token: string,
  payload: UserUpdateFormType
): Promise<UpdateUserResponse> => {
  try {
    const { data } = await api.put<UpdateUserResponse>(`/admin/users/${userId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "update user");
  }
};

// Delete user (admin)
export const deleteUserAdmin = async (userId: string, token: string): Promise<DeleteUserResponse> => {
  try {
    const { data } = await api.delete<DeleteUserResponse>(`/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "delete user");
  }
};
