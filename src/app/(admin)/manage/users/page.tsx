import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import type { UserType } from "@/application/schemas/user.schema";
import { getUsersAdmin } from "@/infrastructure/apis/admin/user.api";
import UsersTable from "@/presentation/features/admin/manage/users";

export default async function UsersPage() {
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

  let initialUsers: UserType[] = [];

  try {
    const response = await getUsersAdmin(session.accessToken);
    initialUsers = response.result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching users:", error.message);
    } else {
      console.error("❌ Unexpected error fetching users:", error);
    }
    redirect("/403");
  }

  return <UsersTable initialUsers={initialUsers} token={session.accessToken} />;
}
