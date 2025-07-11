import axios from "axios";

export const fetchUserById = async (id: string) => {
  const response = await axios.get(`/api/user/${id}`);
  return response.data;
};
