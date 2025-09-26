"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { TestimonialType, UpdateTestimonialDto } from "@/application/schemas/testimonial.schema";
import { updateTestimonialAdmin } from "@/infrastructure/apis/admin/testimonial.api";
import { z } from "zod";

export const testimonialEditSchema = UpdateTestimonialDto.pick({
  name: true,
  comment: true,
  image: true,
});

export type TestimonialEditModel = z.infer<typeof testimonialEditSchema>;

type TestimonialsRowProps = {
  testimonial: TestimonialType;
  token: string;
  onTestimonialUpdated: (testimonial: TestimonialType) => void;
  onTestimonialRemoved?: (testimonialId: string) => void;
};

export default function TestimonialRow({
  testimonial,
  token,
  onTestimonialUpdated,
  onTestimonialRemoved,
}: TestimonialsRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
      let payload: Partial<TestimonialType> | FormData = data;

      if (selectedImage) {
        payload = new FormData();

        if (data.name) payload.append("name", data.name);
        if (data.comment) payload.append("comment", data.comment);
        payload.append("image", selectedImage); // image is guaranteed to be a File
      }

      const updateTestimonial = await updateTestimonialAdmin(testimonial.id, payload, token);
      onTestimonialUpdated(updateTestimonial.result);
      setIsEditing(false);
      setSelectedImage(null);
      toast.success("Testimonial updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to update testimonial");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setSelectedImage(null);
  };

  return (
    <tr>
      <td className="p-2 border">
        {isEditing ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) setSelectedImage(e.target.files[0]);
              }}
              className="w-full p-1 border rounded"
            />
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
