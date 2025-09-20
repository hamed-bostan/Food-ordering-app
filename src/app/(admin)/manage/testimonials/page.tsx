import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import TestimonialsTable from "./components";
import { getTestimonialsAdmin } from "@/infrastructure/apis/admin/testimonial.api";
import { TestimonialModel } from "@/domain/testimonial.schema";

export default async function TestimonialsPage() {
  // Get session server-side
  const session = await getServerSession(authOptions);

  // Redirect if not logged in or missing accessToken
  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  // Only allow admin
  if (session.user.role !== "admin") {
    redirect("/403");
  }

  let initialTestimonials: TestimonialModel[] = [];

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
