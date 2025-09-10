import UsersTable from "./users-table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) {
    redirect("/auth/otp");
  }

  // Redirect if not admin
  if (session.user.role !== "admin") {
    redirect("/403");
  }

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h1 className="mb-4 text-xl font-bold">User Management</h1>
      <UsersTable />
    </div>
  );
}
