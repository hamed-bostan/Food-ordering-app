"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { TestimonialType } from "@/application/schemas/testimonial.schema";
import TestimonialRow from "./TestimonialRow";
import { useSession } from "next-auth/react";
import { TestimonialUpdateFormType } from "@/application/schemas/testimonial.form.schema";

export default function TestimonialsTable({
  initialTestimonials,
  deleteAction,
  updateAction,
}: {
  initialTestimonials: TestimonialType[];
  deleteAction: (testimonialId: string) => Promise<string>;
  updateAction: (testimonialId: string, data: TestimonialUpdateFormType) => Promise<TestimonialType>;
}) {
  const session = useSession();
  const [testimonials, setTestimonials] = useState<TestimonialType[]>(initialTestimonials);

  const updateTestimonialInList = (updatedTestimonial: TestimonialType) => {
    setTestimonials((prev) => prev.map((t) => (t.id === updatedTestimonial.id ? updatedTestimonial : t)));
  };

  const handleTestimonialRemoved = async (testimonialId: string) => {
    const removedTestimonial = testimonials.find((t) => t.id === testimonialId);
    setTestimonials((prev) => prev.filter((t) => t.id !== testimonialId)); // Optimistic

    try {
      const message = await deleteAction(testimonialId);
      toast.success(message);
    } catch (error: unknown) {
      if (removedTestimonial) {
        setTestimonials((prev) => [...prev, removedTestimonial].sort((a, b) => a.id.localeCompare(b.id))); // Rollback
      }
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to delete testimonial");
    }
  };

  const handleUpdateRequest = async (testimonialId: string, data: TestimonialUpdateFormType) => {
    const originalTestimonial = testimonials.find((t) => t.id === testimonialId);
    if (!originalTestimonial) return;

    // Optimistic: Merge without image (keep old string URL)
    const optimisticTestimonial = { ...originalTestimonial, ...data, image: originalTestimonial.image ?? "" };
    updateTestimonialInList(optimisticTestimonial);

    try {
      const updated = await updateAction(testimonialId, data);
      updateTestimonialInList(updated); // Sync with server (new image URL)
      toast.success("Testimonial updated successfully");
    } catch (error: unknown) {
      updateTestimonialInList(originalTestimonial); // Rollback
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to update testimonial");
    }
  };

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Image</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Comment</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {testimonials.map((testimonial) => (
          <TestimonialRow
            key={testimonial.id}
            userRole={session?.data?.user?.role ?? ""}
            testimonial={testimonial}
            onUpdateRequest={handleUpdateRequest}
            onTestimonialRemoved={handleTestimonialRemoved}
          />
        ))}
      </tbody>
    </table>
  );
}
