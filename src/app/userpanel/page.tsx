import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import UserPanelComponent from "./components";

export default async function UserPanelPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) redirect("/auth/otp");

  return <UserPanelComponent />;
}
