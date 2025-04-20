import type { User } from "@/types/user";
import { axiosInstance } from "../supabase/axiosInstance";

export const addUser = async (data: User) => {
  return axiosInstance.post("/user_profiles", data);
};
