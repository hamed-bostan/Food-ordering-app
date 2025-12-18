import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TestimonialUploader from "@/presentation/features/admin/create/testimonials/TestimonialUploader";
import { createTestimonialAction } from "@/application/testimonial.action";

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions);

  const allowedRoles = ["admin", "root"];
  if (!session?.user?.id || !session.accessToken || !allowedRoles.includes(session.user.role)) {
    redirect(session ? "/403" : "/auth/otp");
  }

  return <TestimonialUploader createAction={createTestimonialAction} />;
}
