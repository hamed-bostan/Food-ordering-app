import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserPanelComponent from "./components";
import { getUserById } from "@/infrastructure/apis/user.api";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
export const dynamic = "force-dynamic";

export default async function UserPanelPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in or missing essentials
  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  try {
    const { result: user } = await getUserById(session.user.id, session.accessToken);
    return <UserPanelComponent user={user} />;
  } catch (error) {
    console.error("❌ Failed to fetch user in UserPanelPage:", error);
    redirect("/500"); // or a custom error page
  }
}
