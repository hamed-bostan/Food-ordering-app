"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@/application/schemas/user.schema";
import { AdminFormProfileType, adminFormProfileSchema } from "@/application/schemas/profile-schema";
import { updateUserAdmin } from "@/infrastructure/apis/admin/user.api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { AdminUpdateUserPayload } from "@/infrastructure/apis/user.api";

const ROOT_USER_PHONE = "09356776075";

type UserFormType = AdminFormProfileType;

type UserRowProps = {
  user: UserType;
  token: string;
  currentUserRole: "admin" | "root";
  onUserUpdated: (user: UserType) => void;
  onUserRemoved?: (userId: string) => void;
};

export default function UserRow({ user, token, currentUserRole, onUserUpdated, onUserRemoved }: UserRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const isProtectedUser = user.role === "root" || user.phoneNumber === ROOT_USER_PHONE;

  const defaultAddress =
    user.address && user.address.length > 0 ? [user.address[0]] : [{ value: "", coords: [0, 0] as [number, number] }];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormType>({
    resolver: zodResolver(adminFormProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      phoneNumber: user.phoneNumber ?? "",
      email: user.email ?? "",
      image: user.image ?? "",
      role: user.role,
      address: defaultAddress,
    },
  });

  const onSubmit = async (data: UserFormType) => {
    try {
      const addressItem = data.address?.[0];
      const payload: AdminUpdateUserPayload = {
        ...data,
        address: addressItem?.value?.trim()
          ? [
              {
                ...(addressItem.id ? { id: addressItem.id } : {}),
                value: addressItem.value,
                coords: addressItem.coords ?? user.address?.[0]?.coords ?? [0, 0],
              },
            ]
          : null,
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

  const canEditProtectedFields = currentUserRole === "root" || !isProtectedUser;

  return (
    <tr>
      <td className="p-2 border">
        {isEditing ? <input {...register("name")} className="w-full p-1 border rounded" /> : user.name ?? "-"}
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          canEditProtectedFields ? (
            <input {...register("phoneNumber")} className="w-full p-1 border rounded" />
          ) : (
            <span className="font-semibold text-gray-600">{user.phoneNumber} (protected)</span>
          )
        ) : (
          user.phoneNumber
        )}
        {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <input {...register("address.0.value")} className="w-full p-1 border rounded" />
        ) : (
          user.address?.[0]?.value ?? "-"
        )}
        {errors.address?.[0]?.value && <p className="text-xs text-red-500">{errors.address[0].value.message}</p>}
      </td>

      <td className="p-2 border">
        {isEditing ? <input {...register("email")} className="w-full p-1 border rounded" /> : user.email ?? "-"}
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          canEditProtectedFields ? (
            <select {...register("role")} className="w-full p-1 border rounded">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            <span className="font-semibold text-gray-600">{user.role} (protected)</span>
          )
        ) : (
          user.role
        )}
        {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
      </td>

      <td className="p-2 border">
        {isEditing ? (
          <div className="flex gap-2">
            <button type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="text-green-600">
              <SaveIcon fontSize="small" />
            </button>
            <button type="button" onClick={handleCancel} className="text-gray-600">
              <CloseIcon fontSize="small" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-600">
              <EditIcon fontSize="small" />
            </button>
            {!isProtectedUser && onUserRemoved && (
              <button onClick={() => onUserRemoved(user.id)} className="text-red-600">
                <DeleteIcon fontSize="small" />
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}
