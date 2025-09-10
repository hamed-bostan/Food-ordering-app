import { userApi } from "../user/user.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseUser, User } from "@/lib/user/user.types";

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

  return useMutation<
    void, // mutation returns nothing special
    Error, // error type
    { phoneNumber: string; role: "user" | "admin" } // variables passed in
  >({
    mutationFn: ({ phoneNumber, role }) => userApi.updateUserRole(phoneNumber, role),
    onSuccess: (_, { phoneNumber, role }) => {
      // Optimistically update cache
      queryClient.setQueryData<BaseUser[]>(["users"], (cachedUsers) =>
        cachedUsers?.map((user) => (user.phoneNumber === phoneNumber ? { ...user, role } : user))
      );
    },
  });
}
