"use client";

import { toast } from "react-toastify";
import { useUpdateUserRole, useUsers } from "@/lib/hooks/useUser";
import { BaseUser, User } from "@/lib/user/user.types";

export default function UsersTable() {
  const { data: users = [], isLoading } = useUsers();
  const updateUserRole = useUpdateUserRole();

  if (isLoading) return <p>در حال بارگذاری کاربران...</p>;
  if (!users.length) return <p>کاربری وجود ندارد.</p>;

  const handleUpdate = (phoneNumber: string, role: "user" | "admin") => {
    updateUserRole.mutate(
      { phoneNumber, role },
      {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Failed to update role");
          }
        },
      }
    );
  };

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Phone</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Role</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <tr key={user.id}>
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.phoneNumber}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">{user.role}</td>
            <td className="p-2 border">
              {user.role === "user" ? (
                <button
                  onClick={() => handleUpdate(user.phoneNumber, "admin")}
                  className="px-3 py-1 text-white bg-green-600 rounded"
                >
                  Promote to Admin
                </button>
              ) : (
                <button
                  onClick={() => handleUpdate(user.phoneNumber, "user")}
                  className="px-3 py-1 text-white bg-yellow-600 rounded"
                >
                  Demote to User
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
