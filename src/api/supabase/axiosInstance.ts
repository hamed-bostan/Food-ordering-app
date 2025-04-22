import axios from "axios";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const axiosInstance = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apikey: supabaseKey!,
    Authorization: `Bearer ${supabaseKey!}`,
    "Content-Type": "application/json",
  },
});
