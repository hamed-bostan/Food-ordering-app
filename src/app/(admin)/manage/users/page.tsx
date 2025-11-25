import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import type { UserType } from "@/application/schemas/user.schema";
import { getUsersAdmin } from "@/infrastructure/apis/admin/user.api";
import UsersTable from "@/presentation/features/admin/manage/users";

export default async function UsersPage() {
  // Server-side session
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  const allowedRoles = ["admin", "root"];
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/403");
  }

  let initialUsers: UserType[] = [];

  try {
    const response = await getUsersAdmin(session.accessToken);
    initialUsers = response.result;
  } catch (error: unknown) {
    console.error("❌ Error fetching users:", error);
    redirect("/403");
  }

  return <UsersTable initialUsers={initialUsers} token={session.accessToken} currentUserRole={session.user.role} />;
}
