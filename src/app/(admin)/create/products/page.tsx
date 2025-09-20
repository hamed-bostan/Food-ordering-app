import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ProductUploadPanel from "./components/ProductUploadPanel";
import { getUserById } from "@/infrastructure/apis/user.api";
import type { User } from "@/types/user.types";

export default async function ProductsPage() {
  // Get session server-side
  const session = await getServerSession(authOptions);

  // Redirect if not logged in or missing accessToken
  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  // Only allow admin (quick check)
  if (session.user.role !== "admin") {
    redirect("/403");
  }

  let currentUser: User | null = null;

  try {
    const response = await getUserById(session.user.id, session.accessToken);
    currentUser = response.result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching current user:", error.message);
    } else {
      console.error("❌ Unexpected error fetching current user:", error);
    }
    redirect("/403");
  }

  // Extra guard: ensure fetched user is still admin
  if (!currentUser || currentUser.role !== "admin") {
    redirect("/403");
  }

  return <ProductUploadPanel />;
}
