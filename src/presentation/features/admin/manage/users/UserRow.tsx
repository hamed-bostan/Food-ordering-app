"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { UserType } from "@/application/schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { AdminProfileType, adminProfileSchema } from "@/application/schemas/profile-schema";
import { updateUserAdmin } from "@/infrastructure/apis/admin/user.api";

type UserRowProps = {
  user: UserType;
  token: string;
  onUserUpdated: (user: UserType) => void;
  onUserRemoved?: (userId: string) => void;
};

export default function UserRow({ user, token, onUserUpdated, onUserRemoved }: UserRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminProfileType>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      phoneNumber: user.phoneNumber ?? "",
      email: user.email ?? "",
      image: user.image ?? "",
      date: user.date ?? "",
      role: user.role,
    },
  });

  const onSubmit = async (data: AdminProfileType) => {
    try {
      const updatedUser = await updateUserAdmin(user.id, data, token);
      onUserUpdated(updatedUser.result);
      setIsEditing(false);
      toast.success("User updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to update user");
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
            <input {...register("name")} className="w-full p-1 border rounded" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </>
        ) : (
          user.name
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("phoneNumber")} className="w-full p-1 border rounded" />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
          </>
        ) : (
          user.phoneNumber
        )}
      </td>

      <td className="p-2 text-sm border">
        {isEditing ? (
          <>
            <input {...register("address")} className="w-full p-1 border rounded" />
            {errors.address?.value && <p className="text-sm text-red-500">{errors.address?.value?.message}</p>}
          </>
        ) : (
          user.address?.value
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <>
            <input type="date" {...register("date")} className="w-full p-1 border rounded" />
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </>
        ) : user.date ? (
          new Date(user.date).toLocaleDateString("fa-IR")
        ) : (
          "-"
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("email")} className="w-full p-1 border rounded" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </>
        ) : (
          user.email
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <select {...register("role")} className="w-full p-1 border rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          user.role
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
            <button onClick={() => onUserRemoved?.(user.id)} className="text-red-600">
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
