"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@/application/schemas/user.schema";
import { AdminProfileType, adminProfileSchema } from "@/application/schemas/profile-schema";
import { updateUserAdmin } from "@/infrastructure/apis/admin/user.api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { AdminUpdateUserPayload } from "@/infrastructure/apis/user.api";

const PROTECTED_ADMIN_PHONE = "09356776075";

// 1️⃣ Form DTO type (string date)
type UserFormType = Omit<AdminProfileType, "date"> & { date?: string };

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
  } = useForm<UserFormType>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      phoneNumber: user.phoneNumber ?? "",
      email: user.email ?? "",
      date: user.date ? user.date.toISOString().split("T")[0] : "",
      image: user.image ?? "",
      role: user.role,
      address: user.address ?? { value: "", coords: [0, 0] },
    },
  });

  const isProtectedAdmin = user.phoneNumber === PROTECTED_ADMIN_PHONE;

  const onSubmit = async (data: UserFormType) => {
    try {
      // Keep payload date as string (API expects string)
      const payload: AdminUpdateUserPayload = {
        ...data,
        address: data.address ? { value: data.address.value, coords: user.address?.coords ?? [0, 0] } : null,
      };

      const updatedUser = await updateUserAdmin(user.id, payload, token);
      onUserUpdated(updatedUser.result);
      setIsEditing(false);
      toast.success("User updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
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
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </>
        ) : (
          user.name ?? "-"
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          isProtectedAdmin ? (
            <span className="font-semibold text-gray-600">{user.phoneNumber} (protected)</span>
          ) : (
            <>
              <input {...register("phoneNumber")} className="w-full p-1 border rounded" />
              {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
            </>
          )
        ) : (
          user.phoneNumber
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("address.value")} className="w-full p-1 border rounded" />
            {errors.address?.value && <p className="text-xs text-red-500">{errors.address.value.message}</p>}
          </>
        ) : (
          user.address?.value ?? "-"
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <>
            <input type="date" {...register("date")} className="w-full p-1 border rounded" />
            {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
          </>
        ) : (
          user.date?.toLocaleDateString("fa-IR") ?? "-"
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <>
            <input {...register("email")} className="w-full p-1 border rounded" />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </>
        ) : (
          user.email ?? "-"
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          isProtectedAdmin ? (
            <span className="font-semibold text-gray-600">{user.role} (protected)</span>
          ) : (
            <>
              <select {...register("role")} className="w-full p-1 border rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
            </>
          )
        ) : (
          user.role
        )}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <button type="submit" disabled={isSubmitting} className="text-green-600" aria-label="Save changes">
              <SaveIcon fontSize="small" />
            </button>
            <button type="button" onClick={handleCancel} className="text-gray-600" aria-label="Cancel edit">
              <CloseIcon fontSize="small" />
            </button>
          </form>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-600" aria-label="Edit user">
              <EditIcon fontSize="small" />
            </button>
            {!isProtectedAdmin && (
              <button onClick={() => onUserRemoved?.(user.id)} className="text-red-600" aria-label="Delete user">
                <DeleteIcon fontSize="small" />
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}
