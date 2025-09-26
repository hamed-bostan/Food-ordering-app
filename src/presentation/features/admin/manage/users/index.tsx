"use client";

import { UserType } from "@/application/schemas/user.schema";
import { useState } from "react";
import UserRow from "./UserRow";
import { toast } from "react-toastify";
import { deleteUserAdmin } from "@/infrastructure/apis/admin/user.api";

export default function UsersTable({ initialUsers, token }: { initialUsers: UserType[]; token: string }) {
  const [users, setUsers] = useState<UserType[]>(initialUsers);

  const handleUserUpdated = (updatedUser: UserType) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleUserRemoved = async (userId: string) => {
    try {
      const res = await deleteUserAdmin(userId, token);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success(res.message);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to delete user");
    }
  };

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Phone</th>
          <th className="p-2 border">Address</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Role</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            token={token}
            onUserUpdated={handleUserUpdated}
            onUserRemoved={handleUserRemoved}
          />
        ))}
      </tbody>
    </table>
  );
}
