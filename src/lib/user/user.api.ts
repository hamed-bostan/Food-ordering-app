import api from "../axios";

export const userApi = {
  fetchUserById: async (id: string) => {
    const res = await api.get(`/user/${id}`);
    return res.data;
  },

  fetchUsers: async () => {
    const res = await api.get("/admin/users");
    return res.data;
  },

  updateUserRole: async (phoneNumber: string, role: "user" | "admin") => {
    const res = await api.post("/admin/set-role", { phoneNumber, role });
    return res.data;
  },
};
