import { User } from "@/types/user";
import { axiosInstance } from "../supabase/axiosInstance";

export async function updateUser(data: User) {
  const response = await axiosInstance.put("/user", data);
  return response.data;
}
