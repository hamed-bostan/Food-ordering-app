"use server"; // Server Actions file

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import { api } from "@/infrastructure/axios/api.client";
import { apiCallErrorHandler } from "@/infrastructure/error-handlers/apiCallErrorHandler";
import { TestimonialCreateFormType, TestimonialUpdateFormType } from "./schemas/testimonial.form.schema";

// Added for testimonials, mirroring products (root for update, admin/root for delete)
export async function deleteTestimonialAction(testimonialId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || (session.user.role !== "admin" && session.user.role !== "root")) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.delete(`/admin/testimonials/${testimonialId}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    revalidatePath("/manage/testimonials");
    return data.message || "Testimonial deleted successfully";
  } catch (error: unknown) {
    apiCallErrorHandler(error, "delete testimonial");
  }
}

export async function updateTestimonialAction(testimonialId: string, data: TestimonialUpdateFormType) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || session.user.role !== "root") {
    throw new Error("Unauthorized");
  }
  try {
    let payload: FormData | TestimonialUpdateFormType = data;
    if (data.image instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image" && value !== undefined) formData.append(key, String(value));
      });
      formData.append("image", data.image);
      payload = formData;
    }

    const { data: response } = await api.put(`/admin/testimonials/${testimonialId}`, payload, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        ...(payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
    });
    revalidatePath("/manage/testimonials");
    return response.result; // Assuming returns updated testimonial
  } catch (error: unknown) {
    apiCallErrorHandler(error, "update testimonial");
  }
}

export async function createTestimonialAction(data: TestimonialCreateFormType) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken || (session.user.role !== "admin" && session.user.role !== "root")) {
    throw new Error("Unauthorized");
  }
  try {
    let payload: FormData | TestimonialCreateFormType = data;
    if (data.image instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image" && value !== undefined) formData.append(key, String(value));
      });
      formData.append("image", data.image);
      payload = formData;
    }

    const { data: response } = await api.post(`/admin/testimonials`, payload, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        ...(payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
    });
    revalidatePath("/manage/testimonials"); // Invalidate for consistency
    return response.result; // Assuming returns created testimonial
  } catch (error: unknown) {
    apiCallErrorHandler(error, "create testimonial");
  }
}
