import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/infrastructure/apis/user.api";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserPanel from "@/presentation/features/userpanel";
export const dynamic = "force-dynamic";
import { OrderProvider } from "@/context/OrderContext";

export default async function UserPanelPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  try {
    const { result: user } = await getUserById(session.user.id, session.accessToken);

    return (
      <OrderProvider>
        <UserPanel user={user} />
      </OrderProvider>
    );
  } catch (error) {
    console.error("❌ Failed to fetch user in UserPanelPage:", error);
    redirect("/500");
  }
}
