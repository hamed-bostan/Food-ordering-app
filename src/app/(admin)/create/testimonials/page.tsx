import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TestimonialUploadPanel from "./components/TestimonialUploadPanel";
import { getUserById } from "@/infrastructure/apis/user.api";

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in or missing essentials
  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  // Quick client-side role check (cheap and fast)
  if (session.user.role !== "admin") {
    redirect("/403");
  }

  try {
    const { result: currentUser } = await getUserById(session.user.id, session.accessToken);

    // Extra guard: confirm user is still admin on server
    if (currentUser.role !== "admin") {
      redirect("/403");
    }

    return <TestimonialUploadPanel accessToken={session.accessToken} />;
  } catch (error) {
    console.error("❌ Failed to fetch current user in TestimonialsPage:", error);
    redirect("/500"); // or "/403" depending on your preference
  }
}
