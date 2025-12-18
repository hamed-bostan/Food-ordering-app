import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getTestimonialsAdmin } from "@/infrastructure/apis/admin/testimonial.api";
import TestimonialsTable from "@/presentation/features/admin/manage/testimonials";
import { deleteTestimonialAction, updateTestimonialAction } from "@/application/testimonial.action";

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions);

  const allowedRoles = ["admin", "root"];
  if (!session?.user?.id || !session.accessToken || !allowedRoles.includes(session.user.role)) {
    redirect(session ? "/403" : "/auth/otp");
  }

  const { result } = await getTestimonialsAdmin(session.accessToken);

  return (
    <TestimonialsTable
      initialTestimonials={result}
      deleteAction={deleteTestimonialAction}
      updateAction={updateTestimonialAction}
    />
  );
}
