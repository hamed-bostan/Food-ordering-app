import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getUsersAdmin } from "@/infrastructure/apis/admin/user.api";
import UsersTable from "@/presentation/features/admin/manage/users";
import { deleteUserAction, updateUserAction } from "@/application/user.actions";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  const allowedRoles = ["admin", "root"];
  if (!session?.user?.id || !session.accessToken || !allowedRoles.includes(session.user.role)) {
    redirect(session ? "/403" : "/auth/otp");
  }

  const { result } = await getUsersAdmin(session.accessToken);

  return (
    <UsersTable
      initialUsers={result}
      currentUserRole={session.user.role}
      deleteAction={deleteUserAction}
      updateAction={updateUserAction}
    />
  );
}
