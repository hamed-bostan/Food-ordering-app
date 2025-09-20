"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { TestimonialModel, testimonialSchema } from "@/domain/testimonial.schema";
import { updateTestimonialAdmin } from "@/infrastructure/apis/admin/testimonial.api";
import { z } from "zod";

// Pick only the fields we want to edit
const testimonialEditSchema = testimonialSchema.pick({
  name: true,
  comment: true,
  image: true,
});

type TestimonialEditModel = z.infer<typeof testimonialEditSchema>;

type TestimonialsRowProps = {
  testimonial: TestimonialModel;
  token: string;
  onTestimonialUpdated: (Testimonial: TestimonialModel) => void;
  onTestimonialRemoved?: (testimonialId: string) => void;
};

export default function TestimonialsRow({
  testimonial,
  token,
  onTestimonialUpdated,
  onTestimonialRemoved,
}: TestimonialsRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialEditModel>({
    resolver: zodResolver(testimonialEditSchema),
    defaultValues: {
      name: testimonial.name,
      comment: testimonial.comment,
      image: testimonial.image,
    },
  });

  const onSubmit = async (data: TestimonialEditModel) => {
    try {
      const updateTestimonial = await updateTestimonialAdmin(testimonial.id, data, token);
      onTestimonialUpdated(updateTestimonial.result);
      setIsEditing(false);
      toast.success("Testimonial updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to update testimonial");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <tr>
      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("image")} className="w-full p-1 border rounded" />
            {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
          </>
        ) : (
          <img src={testimonial.image} alt={testimonial.name} className="object-cover w-16 h-16 rounded" />
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("name")} className="w-full p-1 border rounded" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </>
        ) : (
          testimonial.name
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("comment")} className="w-full p-1 border rounded" />
            {errors.comment && <p className="text-sm text-red-500">{errors.comment.message}</p>}
          </>
        ) : (
          testimonial.comment
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <button type="submit" disabled={isSubmitting} className="text-green-600">
              <SaveIcon fontSize="small" />
            </button>
            <button type="button" onClick={handleCancel} className="text-gray-600">
              <CloseIcon fontSize="small" />
            </button>
          </form>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-600">
              <EditIcon fontSize="small" />
            </button>
            <button onClick={() => onTestimonialRemoved?.(testimonial.id)} className="text-red-600">
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
