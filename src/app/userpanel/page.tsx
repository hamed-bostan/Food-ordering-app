import UserPanel from "./components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function UserPanelPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) redirect("/auth/otp");

  return <UserPanel />;
}
