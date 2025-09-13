import UsersTable from "./users-table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getUsers } from "@/lib/user/user.api";
import type { User } from "@/lib/user/user.types";

export default async function AdminPage() {
  // Get session server-side
  const session = await getServerSession(authOptions);

  // Redirect if not logged in or missing accessToken
  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  // Only allow admin
  if (session.user.role !== "admin") {
    redirect("/403");
  }

  let initialUsers: User[] = [];

  try {
    const response = await getUsers(session.accessToken);
    initialUsers = response.result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching users:", error.message);
    } else {
      console.error("❌ Unexpected error fetching users:", error);
    }
    redirect("/403");
  }

  return <UsersTable initialUsers={initialUsers} />;
}
