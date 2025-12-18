import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { api } from "@/infrastructure/axios/api.client";
import { apiCallErrorHandler } from "@/infrastructure/error-handlers/apiCallErrorHandler";

export type GetTestimonialsResponse = { message: string; result: TestimonialType[] };
export type GetTestimonialByIdResponse = { message: string; result: TestimonialType };

export const getTestimonialsAdmin = async (token: string): Promise<GetTestimonialsResponse> => {
  try {
    const { data } = await api.get<GetTestimonialsResponse>("/admin/testimonials", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!Array.isArray(data.result)) throw new Error("Invalid server response");
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "fetch testimonials");
  }
};

export const getTestimonialByIdAdmin = async (id: string, token: string): Promise<GetTestimonialByIdResponse> => {
  try {
    const { data } = await api.get<GetTestimonialByIdResponse>(`/admin/testimonials/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.result || typeof data.result !== "object") throw new Error("Invalid server response");
    return data;
  } catch (error: unknown) {
    apiCallErrorHandler(error, "fetch testimonial by ID");
  }
};
