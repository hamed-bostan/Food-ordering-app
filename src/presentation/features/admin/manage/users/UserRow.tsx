"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@/application/schemas/user.schema";
import { AdminFormProfileType, adminFormProfileSchema } from "@/application/schemas/profile-schema";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { UserUpdateDto } from "@/application/dto/users/user.dto"; // For payload type
type UserFormType = AdminFormProfileType;
type UserRowProps = {
  user: UserType;
  currentUserRole: "admin" | "root";
  onUserUpdated: (user: UserType) => void;
  onUserRemoved?: (userId: string) => void;
  updateAction: (userId: string, data: UserUpdateDto) => Promise<UserType>;
};
export default function UserRow({ user, currentUserRole, onUserUpdated, onUserRemoved, updateAction }: UserRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const isProtectedUser = user.role === "root";
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
      role: user.role,
      address: defaultAddress,
    },
  });
  const onSubmit = async (data: UserFormType) => {
    try {
      const addressItem = data.address?.[0];
      const payload: UserUpdateDto = {
        name: data.name,
        role: data.role,
        email: data.email,
        address: addressItem?.value?.trim()
          ? [
              {
                ...(addressItem.id ? { id: addressItem.id } : {}),
                value: addressItem.value.trim(),
                coords: addressItem.coords ?? user.address?.[0]?.coords ?? [0, 0],
              },
            ]
          : [],
      };
      // Only include if non-empty (avoids invalid "")
      if (data.email?.trim()) {
        payload.email = data.email.trim();
      }
      if (data.phoneNumber?.trim()) {
        payload.phoneNumber = data.phoneNumber.trim();
      }
      const updatedUser = await updateAction(user.id, payload);
      onUserUpdated(updatedUser);
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
        {errors.address?.[0]?.value && <p className="text-xs text-red-500">{errors.address[0].value?.message}</p>}
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
              {currentUserRole === "root" && <option value="root">Root</option>}
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
            {onUserRemoved && (!isProtectedUser || currentUserRole === "root") && (
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
