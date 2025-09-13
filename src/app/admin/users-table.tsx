"use client";

import { toast } from "react-toastify";
import { User, UserRole } from "@/lib/user/user.types";
import { useState } from "react";
import { updateUserRole } from "@/lib/user/user.api";

type UsersTableProps = {
  initialUsers: User[];
};

export default function UsersTable({ initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleUpdate = async (phoneNumber: string, role: UserRole) => {
    try {
      const updatedUser = await updateUserRole(phoneNumber, role);

      // Update local state with the updated User object
      setUsers((prevUsers) => prevUsers.map((user) => (user.phoneNumber === phoneNumber ? updatedUser.result : user)));

      toast.success(`User role updated to "${role}"`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update role");
      }
    }
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
        {users.map((user) => (
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
