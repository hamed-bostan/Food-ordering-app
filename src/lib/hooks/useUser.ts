import { userApi } from "../user/user.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseUser, User, UserRole } from "@/lib/user/user.types";

// Hook to fetch a single user
export function useUser(id?: string) {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => userApi.fetchUserById(id!),
    enabled: !!id,
  });
}

// Hook to fetch all users
export function useUsers() {
  return useQuery<BaseUser[]>({
    queryKey: ["users"],
    queryFn: () => userApi.fetchUsers(),
  });
}

// Hook to update user role
export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { phoneNumber: string; role: UserRole }>({
    mutationFn: ({ phoneNumber, role }) => userApi.updateUserRole(phoneNumber, role),
    onSuccess: (updatedUser, { phoneNumber }) => {
      // Update cached users
      queryClient.setQueryData<BaseUser[]>(["users"], (cachedUsers) =>
        cachedUsers?.map((user) => (user.phoneNumber === phoneNumber ? { ...user, role: updatedUser.role } : user))
      );
      // Also update single user cache
      queryClient.setQueryData<User>(["user", updatedUser.id], updatedUser);
    },
  });
}
