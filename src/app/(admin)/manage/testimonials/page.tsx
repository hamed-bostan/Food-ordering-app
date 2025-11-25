import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getTestimonialsAdmin } from "@/infrastructure/apis/admin/testimonial.api";
import { TestimonialType } from "@/application/schemas/testimonial.schema";
import TestimonialsTable from "@/presentation/features/admin/manage/testimonials";

export default async function TestimonialsPage() {
  // Get session server-side
  const session = await getServerSession(authOptions);

  // Redirect if not logged in or missing accessToken
  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  const allowedRoles = ["admin", "root"];
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/403");
  }

  let initialTestimonials: TestimonialType[] = [];

  try {
    const response = await getTestimonialsAdmin(session.accessToken);
    initialTestimonials = response.result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching users:", error.message);
    } else {
      console.error("❌ Unexpected error fetching users:", error);
    }
    redirect("/403");
  }

  return <TestimonialsTable initialTestimonials={initialTestimonials} token={session.accessToken} />;
}
