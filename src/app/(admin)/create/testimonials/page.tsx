import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getUserById } from "@/infrastructure/apis/user.api";
import TestimonialUploader from "@/presentation/features/admin/create/testimonials/TestimonialUploader";

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in or missing essentials
  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  const allowedRoles = ["admin", "root"];
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/403");
  }

  try {
    await getUserById(session.user.id, session.accessToken);

    return <TestimonialUploader accessToken={session.accessToken} />;
  } catch (error) {
    console.error("❌ Failed to fetch current user in TestimonialsPage:", error);
    redirect("/500"); // or "/403" depending on your preference
  }
}
