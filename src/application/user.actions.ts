"use server"; // Server Actions file

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { UserUpdateFormType } from "@/application/schemas/user.form.schema";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import { updateUserAdmin, deleteUserAdmin } from "@/infrastructure/apis/admin/user.api";

export async function deleteUserAction(userId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || (session.user.role !== "admin" && session.user.role !== "root")) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await deleteUserAdmin(userId, session.accessToken);
    revalidatePath("/manage/users");
    return response.message || "User deleted successfully";
  } catch (error: unknown) {
    // apiCallErrorHandler is already in the API function; add action-specific handling if needed
    throw error;
  }
}

export async function updateUserAction(userId: string, data: UserUpdateFormType) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || session.user.role !== "root") {
    throw new Error("Unauthorized");
  }
  try {
    const response = await updateUserAdmin(userId, session.accessToken, data);
    revalidatePath("/manage/users");
    return response.result; // Assuming returns updated user
  } catch (error: unknown) {
    // apiCallErrorHandler is already in the API function; add action-specific handling if needed
    throw error;
  }
}
