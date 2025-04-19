import { User } from "@/types/user";
import { axiosInstance } from "./axiosInstance";

const table = "user_profiles";

export async function getUserInfo(): Promise<User[]> {
  const { data } = await axiosInstance.get(`/${table}?select=*`);
  return data;
}

export async function addUserInfo(user: User): Promise<User> {
  const { data } = await axiosInstance.post(`/${table}`, user);
  return data[0]; // Supabase returns array even for one row
}

export async function updateUserInfo(
  id: string,
  updates: Partial<User>
): Promise<User> {
  const { data } = await axiosInstance.patch(`/${table}?id=eq.${id}`, updates);
  return data[0];
}
