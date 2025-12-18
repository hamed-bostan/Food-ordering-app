"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { TestimonialUpdateFormSchema, TestimonialUpdateFormType } from "@/application/schemas/testimonial.form.schema";

type TestimonialRowProps = {
  testimonial: TestimonialType;
  onUpdateRequest: (testimonialId: string, data: TestimonialUpdateFormType) => Promise<void>;
  onTestimonialRemoved: (testimonialId: string) => void;
  userRole: string;
};

export default function TestimonialRow({
  testimonial,
  onUpdateRequest,
  onTestimonialRemoved,
  userRole,
}: TestimonialRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const isRoot = userRole === "root";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialUpdateFormType>({
    resolver: zodResolver(TestimonialUpdateFormSchema),
    defaultValues: {
      name: testimonial.name,
      comment: testimonial.comment,
    },
  });

  const onSubmit = async (data: TestimonialUpdateFormType) => {
    if (!isRoot) return;

    const payload = { ...data };
    if (selectedImage) {
      payload.image = selectedImage; // File for upload
    }
    await onUpdateRequest(testimonial.id, payload);
    setIsEditing(false); // Toggle off on success (error handled in table)
    setSelectedImage(null);
    reset();
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setSelectedImage(null);
  };

  return (
    <tr>
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) setSelectedImage(e.target.files[0]);
            }}
            className="w-full p-1 mx-auto border rounded"
          />
        ) : (
          testimonial.image && (
            <img src={testimonial.image} alt={testimonial.name} className="object-cover w-16 h-16 mx-auto rounded" />
          )
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

      <td className="p-2 text-center border">
        {isRoot && isEditing && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <button type="submit" className="text-green-600">
              <SaveIcon fontSize="small" />
            </button>
            <button type="button" onClick={handleCancel} className="text-gray-600">
              <CloseIcon fontSize="small" />
            </button>
          </form>
        )}

        {isRoot && !isEditing && (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-600">
              <EditIcon fontSize="small" />
            </button>
            <button onClick={() => onTestimonialRemoved(testimonial.id)} className="text-red-600">
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        )}

        {!isRoot && <span className="text-gray-400">No actions</span>}
      </td>
    </tr>
  );
}
