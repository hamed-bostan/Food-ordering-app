"use client";

import { UserType } from "@/application/schemas/user.schema";
import { useState } from "react";
import UserRow from "./UserRow";
import { toast } from "react-toastify";

type UsersTableProps = {
  initialUsers: UserType[];
  currentUserRole: "admin" | "root";
  deleteAction: (userId: string) => Promise<string>;
  updateAction: (userId: string, data: any) => Promise<UserType>; // Adjust type as needed
};

export default function UsersTable({ initialUsers, currentUserRole, deleteAction, updateAction }: UsersTableProps) {
  const [users, setUsers] = useState<UserType[]>(initialUsers);

  const handleUserUpdated = (updatedUser: UserType) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleUserRemoved = async (userId: string) => {
    try {
      const message = await deleteAction(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success(message);
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
            currentUserRole={currentUserRole}
            onUserUpdated={handleUserUpdated}
            onUserRemoved={handleUserRemoved}
            updateAction={updateAction}
          />
        ))}
      </tbody>
    </table>
  );
}