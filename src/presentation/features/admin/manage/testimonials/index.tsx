"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { deleteTestimonialAdmin } from "@/infrastructure/apis/admin/testimonial.api";
import TestimonialRow from "./TestimonialRow";

export default function TestimonialsTable({
  initialTestimonials,
  token,
}: {
  initialTestimonials: TestimonialType[];
  token: string;
}) {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>(initialTestimonials);

  const handleTestimonialUpdated = (updatedTestimonial: TestimonialType) => {
    setTestimonials((prev) => prev.map((u) => (u.id === updatedTestimonial.id ? updatedTestimonial : u)));
  };

  const handleTestimonialRemoved = async (testimonialId: string) => {
    try {
      const res = await deleteTestimonialAdmin(testimonialId, token);
      setTestimonials((prev) => prev.filter((u) => u.id !== testimonialId));
      toast.success(res.message);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to delete testimonial");
    }
  };

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">image</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Comments</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {testimonials.map((testimonial) => (
          <TestimonialRow
            key={testimonial.id}
            testimonial={testimonial}
            token={token}
            onTestimonialUpdated={handleTestimonialUpdated}
            onTestimonialRemoved={handleTestimonialRemoved}
          />
        ))}
      </tbody>
    </table>
  );
}
